import { Either, left, right } from "../../../utils/either";
import { Product } from "../entity/ProductEntity";
import { BadRequest } from "../errors/custom/BadRequest";
import { ProductRepository } from "../repository/ProductRepositoy";

type Response = Either<BadRequest, Product[]>;

export class ListAllProducts {

    constructor(private readonly productRepository: ProductRepository) { }

    async execute(): Promise<Response> {
        const products = await this.productRepository.findAll();

        if (!products) {
            return left(new BadRequest(`Error em listar produtos`));
        }

        return right(products);
    }
}