import { Product } from "../entity/ProductEntity";
import { ProductRepository } from "../repository/ProductRepositoy";
import { ListAllProducts } from "../useCase/ListAllProducts";

const mockRepository = {
    findByName: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn()
};

const makeSut = () => {
    const sut = new ListAllProducts(mockRepository);
    return { sut, mockRepository };
};

describe("ListAllProducts UseCase", () => {
    const fakeProducts = [
        Product.create({
            name: "Produto 1",
            description: "Descrição 1",
            price: 10,
            quantity: 5,
        }),
        Product.create({
            name: "Produto 2",
            description: "Descrição 2",
            price: 20,
            quantity: 3,
        }),
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todos os produtos com sucesso", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.findAll.mockResolvedValue(fakeProducts);

        const result = await sut.execute();

        expect(result.isRigth()).toBe(true);
        expect(result.value).toEqual(fakeProducts);
        expect(mockRepository.findAll).toHaveBeenCalled();
    });
});