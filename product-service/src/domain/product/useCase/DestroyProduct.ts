import { Either, left, right } from "../../../utils/either";
import { BadRequest } from "../errors/custom/BadRequest";
import { NotFoundError } from "../errors/custom/NotFound";
import { ProductRepository } from "../repository/ProductRepositoy";

type Request = {
    id: string;
}

type Response = Either<NotFoundError | BadRequest, true>;

export class DestroyProduct {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(data: Request): Promise<Response> {
        const { id } = data;

        const product = await this.productRepository.findById(id);

        if (!product) return left(new NotFoundError(`Product with id ${id} not found.`));

        if (product.quantity > 0) return left(new BadRequest(`Product with quantity in stock.`));

        await this.productRepository.delete(id);

        return right(true);
    }
}