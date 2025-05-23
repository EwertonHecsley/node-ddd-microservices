import { Product } from "../entity/ProductEntity";
import { BadRequest } from "../errors/custom/BadRequest";
import { CreateProduct } from "../useCase/CreateProduct";


const mockRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
};

const makeSut = () => {
    const sut = new CreateProduct(mockRepository);
    return { sut, mockRepository };
};

describe("CreateProduct Use Case", () => {
    const fakeData = {
        name: "Produto X",
        description: "Alguma descrição",
        price: 100,
        quantity: 10,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um produto com sucesso", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.create.mockResolvedValue(Product.create(fakeData));

        const result = await sut.execute(fakeData);

        expect(result.isRigth()).toBe(true);
        expect(mockRepository.create).toHaveBeenCalled();
    });


    it("deve retornar erro se falhar ao salvar o produto", async () => {
        const { sut, mockRepository } = makeSut();

        mockRepository.create.mockResolvedValue(null);

        const result = await sut.execute(fakeData);

        expect(result.isLeft()).toBe(true);
    });
});
