import { DestroyProduct } from "../useCase/DestroyProduct";
import { Product } from "../entity/ProductEntity";
import { NotFoundError } from "../errors/custom/NotFound";
import { BadRequest } from "../errors/custom/BadRequest";


const mockRepository = {
    findById: jest.fn(),
    findByName: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
};

const makeSut = () => {
    const sut = new DestroyProduct(mockRepository);
    return { sut, mockRepository };
};

describe("DestroyProduct UseCase", () => {
    const fakeProduct = Product.create({
        name: "Produto 1",
        description: "Descrição 1",
        price: 10,
        quantity: 0,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve deletar o produto com sucesso", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.findById.mockResolvedValue(fakeProduct);
        mockRepository.delete.mockResolvedValue(true);

        const result = await sut.execute({ id: "abc-123" });

        expect(result.isRigth()).toBe(true);
        expect(result.value).toBe(true);
        expect(mockRepository.findById).toHaveBeenCalledWith("abc-123");
        expect(mockRepository.delete).toHaveBeenCalledWith("abc-123");
    });

    it("deve retornar erro NotFound se o produto não for encontrado", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.findById.mockResolvedValue(undefined);

        const result = await sut.execute({ id: "abc-123" });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotFoundError);
        expect(result.value).toHaveProperty("message", "Product with id abc-123 not found.");
    });

    it("deve retornar erro BadRequest se o produto tem quantidade em estoque", async () => {
        const { sut, mockRepository } = makeSut();

        const productWithStock = Product.create({
            name: "Produto 2",
            description: "Descrição 2",
            price: 15,
            quantity: 5
        });

        mockRepository.findById.mockResolvedValue(productWithStock);

        const result = await sut.execute({ id: "abc-124" });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(BadRequest);
        expect(result.value).toHaveProperty("message", "Product with quantity in stock.");
    });
});
