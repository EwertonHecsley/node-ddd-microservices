import { Product } from "../entity/ProductEntity";
import { NotFoundError } from "../errors/custom/NotFound";
import { FindProduct } from "../useCase/FindProduct";

const mockRepository = {
    findById: jest.fn(),
    create: jest.fn(),
    findByName: jest.fn(),
    findAll: jest.fn()
}

const makeSut = () => {
    const sut = new FindProduct(mockRepository);
    return { sut, mockRepository };
};

describe("FindProduct UseCase", () => {
    const fakeId = "abc-123";
    const fakeProduct = Product.create(
        {
            name: "Produto X",
            description: "Alguma descrição",
            price: 100,
            quantity: 10,
        }
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it("deve encontrar um produto com sucesso", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.findById.mockResolvedValue(fakeProduct);

        const result = await sut.execute({ id: fakeId });

        expect(result.isRigth()).toBe(true);
        expect(mockRepository.findById).toHaveBeenCalledWith(fakeId);
        expect(result.value).toEqual(fakeProduct);
    })

    it("deve retornar erro se produto não for encontrado", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.findById.mockResolvedValue(null);

        const result = await sut.execute({ id: fakeId });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotFoundError);
        expect(result.value).toHaveProperty("message", "Product with id abc-123 not found");
    });
})