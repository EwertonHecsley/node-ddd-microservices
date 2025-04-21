import Entity from "../../../core/generics/Entity";
import Identity from "../../../core/generics/Identity";

type ProductType = {
    name: string;
    price: number;
    description: string;
    quantity: number;
}

export class Product extends Entity<ProductType> {

    static create(attributes: ProductType, id?: Identity): Product {
        return new Product(
            {
                ...attributes
            },
            id
        )
    }

    get name(): string {
        return this.attributes.name;
    }

    get price(): number {
        return this.attributes.price;
    }

    get description(): string {
        return this.attributes.description;
    }

    get quantity(): number {
        return this.attributes.quantity;
    }

    set name(name: string) {
        this.attributes.name = name;
    }

    set price(price: number) {
        this.attributes.price = price;
    }

    set description(description: string) {
        this.attributes.description;
    }

    set quantity(quantity: number) {
        this.attributes.quantity = quantity;
    }
}