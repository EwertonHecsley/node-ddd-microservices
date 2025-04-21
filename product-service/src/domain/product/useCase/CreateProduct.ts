import { Either, left, right } from "../../../utils/either"
import { Product } from "../entity/ProductEntity"
import { BadRequest } from "../errors/custom/BadRequest"
import { ProductRepository } from "../repository/ProductRepositoy"

type Request = {
    name: string
    description: string
    price: number
    quantity: number
}

type Response = Either<BadRequest, Product>;


export class CreateProduct {

    constructor(private readonly productRepository: ProductRepository) { }

    async execute(data: Request): Promise<Response> {
        const { name } = data;

        const productExist = await this.productRepository.findByName(name);

        if (productExist) {
            return left(new BadRequest(`Product with name ${name} already exists`));
        }

        const newProduct = Product.create(data);

        const product = await this.productRepository.create(newProduct);

        if (!product) {
            return left(new BadRequest(`Error creating product`));
        }

        return right(product)
    }
}