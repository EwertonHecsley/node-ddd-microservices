import { Product } from "../entity/ProductEntity";

export abstract class ProductRepository {
    abstract create(entity: Product): Promise<Product>;
    abstract findById(id: string): Promise<Product | undefined>;
    abstract findByName(name: string): Promise<Product | undefined>;
}