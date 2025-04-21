import { Product } from "../../../domain/product/entity/ProductEntity";
import { ProductRepository } from "../../../domain/product/repository/ProductRepositoy";
import { ProductPrismaMapper } from "../prisma/mappers/ProductPrismaMappers";
import getPrismaInstance from "../prisma/singletonPrisma";
import { Product as DatabaseProduct } from "../../generated/prisma";


export class ProductPrismaRepository implements ProductRepository {
    private prisma = getPrismaInstance();

    async create(entity: Product): Promise<Product> {
        const data = ProductPrismaMapper.toDatabase(entity);

        const product = await this.prisma.product.create({
            data,
        });

        return ProductPrismaMapper.toDomain(product);
    }

    async findById(id: string): Promise<Product | undefined> {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!product) return undefined;

        return ProductPrismaMapper.toDomain(product);

    }

    async findByName(name: string): Promise<Product | undefined> {
        const product = await this.prisma.product.findUnique({
            where: {
                name,
            },
        });

        if (!product) return undefined;

        return ProductPrismaMapper.toDomain(product);
    }

    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();

        return products.map((product: DatabaseProduct) => ProductPrismaMapper.toDomain(product));
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product.delete({
            where: {
                id,
            },
        });
    }

    async save(entity: Product): Promise<void> {
        const data = ProductPrismaMapper.toDatabase(entity);

        await this.prisma.product.update({
            where: {
                id: entity.Id.valueId,
            },
            data,
        });
    }
}