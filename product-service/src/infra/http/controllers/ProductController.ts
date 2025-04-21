import { Request, Response } from "express";
import { CreateProduct } from "../../../domain/product/useCase/CreateProduct";
import { ProductPrismaRepository } from "../../database/repository/ProductPrismaRepository";
import logger from "../../../utils/logger";
import { GenericErrors } from "../../../domain/product/errors/GenericsError";
import { ProductPresenter } from "../presenters/ProductPresenter";

export class ProductController {
    private readonly repository = new ProductPrismaRepository();
    private readonly createUseCase = new CreateProduct(this.repository);

    async create(req: Request, res: Response): Promise<void> {

        logger.info('📦 Creating new product...');
        const { name, price, quantity, description } = req.body;

        const result = await this.createUseCase.execute({ name, price, quantity, description });

        if (result.isLeft()) {
            const error = result.value as GenericErrors;
            logger.warn(`❌ Product creation failed: ${result.value?.message}`);
            res.status(error.statusCode).json({ message: error.message });
            return;
        }

        logger.info('✅ Product created successfully.');
        res.status(201).json(
            {
                message: "Product created successfully",
                product: ProductPresenter.toHTTP(result.value)
            }
        )
    }
}