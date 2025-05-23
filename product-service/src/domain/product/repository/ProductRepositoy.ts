import { Product } from "../entity/ProductEntity";

export abstract class ProductRepository {
    abstract create(entity: Product): Promise<Product>;
    abstract findById(id: string): Promise<Product | undefined>;
    abstract findAll(): Promise<Product[]>;
    abstract delete(id: string): Promise<void>;
    abstract save(entity: Product): Promise<void>;
}