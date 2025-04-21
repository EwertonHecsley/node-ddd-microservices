import { EditProduct } from "../useCase/EditProduct";
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
    const sut = new EditProduct(mockRepository);
    return { sut, mockRepository };
};

describe("EditProduct UseCase", () => {
    const fakeProduct = {
        id: "1",
        name: "Produto 1",
        description: "Descrição 1",
        price: 10,
        quantity: 5,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar erro se o preço for negativo", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            id: "1",
            name: "Produto 1",
            price: -10,
            description: "Descrição 1",
            quantity: 5,
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(BadRequest);
    });

    it("deve retornar erro se a quantidade for negativa", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            id: "1",
            name: "Produto 1",
            price: 10,
            description: "Descrição 1",
            quantity: -5,
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(BadRequest);
    });

    it("deve retornar erro se o produto não for encontrado", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.findById.mockResolvedValue(null);

        const result = await sut.execute({
            id: "2",
            name: "Produto 2",
            price: 20,
            description: "Descrição 2",
            quantity: 3,
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotFoundError);
    });

    it("deve atualizar o produto com sucesso", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.findById.mockResolvedValue(fakeProduct);
        mockRepository.save.mockResolvedValue(true);

        const result = await sut.execute({
            id: "1",
            name: "Produto Atualizado",
            price: 15,
            description: "Descrição Atualizada",
            quantity: 10,
        });

        expect(result.isRigth()).toBe(true);
        expect(result.value).toBe(true);
        expect(mockRepository.save).toHaveBeenCalledWith({
            ...fakeProduct,
            name: "Produto Atualizado",
            price: 15,
            description: "Descrição Atualizada",
            quantity: 10,
        });
    });
});
