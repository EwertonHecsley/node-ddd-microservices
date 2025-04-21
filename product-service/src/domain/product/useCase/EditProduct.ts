import { Either, left, right } from "../../../utils/either";
import { BadRequest } from "../errors/custom/BadRequest";
import { NotFoundError } from "../errors/custom/NotFound";
import { ProductRepository } from "../repository/ProductRepositoy";

type Request = {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

type Response = Either<NotFoundError | BadRequest, true>;

export class EditProduct {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(data: Request): Promise<Response> {
        const { id, name, price, description, quantity } = data;

        const validationError = this.validateFields(price, quantity);
        if (validationError) return left(validationError);

        const product = await this.productRepository.findById(id);
        if (!product) return left(new NotFoundError(`Product with id ${id} not found.`));

        Object.assign(product, { name, price, description, quantity });

        await this.productRepository.save(product);

        return right(true);
    }

    private validateFields(price: number, quantity: number): BadRequest | null {
        if (price < 0) return new BadRequest("Price must be greater than or equal to 0.");
        if (quantity < 0) return new BadRequest("Quantity must be greater than or equal to 0.");
        return null;
    }
}
