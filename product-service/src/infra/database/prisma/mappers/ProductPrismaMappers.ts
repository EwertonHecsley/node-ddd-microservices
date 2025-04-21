import Identity from "../../../../core/generics/Identity";
import { Product } from "../../../../domain/product/entity/ProductEntity";
import { Product as DatabaseProduct, Prisma } from "../../../generated/prisma";

export class ProductPrismaMapper {
    static toDomain(entity: DatabaseProduct): Product {
        return Product.create(
            {
                name: entity.name,
                price: entity.price,
                description: entity.description,
                quantity: entity.quantity,
                date_created: entity.date_created,
            },
            new Identity(entity.id)
        );
    }

    static toDatabase(entity: Product): Prisma.ProductCreateInput {
        return {
            id: entity.Id.valueId,
            name: entity.name,
            price: entity.price,
            description: entity.description,
            quantity: entity.quantity,
            date_created: entity.date_created ?? new Date(),
        };
    }
}
