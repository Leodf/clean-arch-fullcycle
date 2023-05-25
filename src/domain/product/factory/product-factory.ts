import Product from "../entity/product";
import ProductB from "../entity/product-b";
import { v4 as uuid } from 'uuid'
import { ProductDto } from "./product-factory-dto";

export default class ProductFactory {
    public static create(productDto: ProductDto) {
        const { id, type, name, price } = productDto
        const productId = id ? id : uuid()
        switch (type) {
            case "a":
                return new Product(productId, name, price)
            case "b":
                return new ProductB(productId, name, price)
            default:
                throw new Error("Product type not supported")
        }
    }
}