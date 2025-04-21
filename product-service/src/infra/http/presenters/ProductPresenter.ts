import { Product } from "../../../domain/product/entity/ProductEntity";



export class ProductPresenter {

    static toHTTP(entity: Product) {
        return {
            id: entity.Id.valueId,
            name: entity.name,
            price: entity.price,
            description: entity.description,
            quantity: entity.quantity,
            date_created: entity.date_created
        }
    }
}