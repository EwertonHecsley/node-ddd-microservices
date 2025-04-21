import { Either, left, right } from "../../../utils/either";
import { Product } from "../entity/ProductEntity";
import { NotFoundError } from "../errors/custom/NotFound";
import { ProductRepository } from "../repository/ProductRepositoy";

type Request = {
    id: string;
}

type Response = Either<NotFoundError, Product>;

export class FindProduct {

    constructor(private readonly ProductRepositoy: ProductRepository) { }

    async execute(data: Request): Promise<Response> {
        const { id } = data;

        const product = await this.ProductRepositoy.findById(id);

        if (!product) {
            return left(new NotFoundError(`Product with id ${id} not found`));
        }

        return right(product);
    }
}