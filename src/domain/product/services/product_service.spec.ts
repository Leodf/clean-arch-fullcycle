import ProductA from "../entity/product-a"
import ProductService from "./product_service"

describe('Product service unit tests', () => {
    test('should change the prices of all products', () => {
        const product1 = new ProductA('1', 'product 1', 10)
        const product2 = new ProductA('2', 'product 2', 20)
        const products = [product1, product2]

        ProductService.increasePrice(products, 100)

        expect(product1.price).toBe(20)
        expect(product2.price).toBe(40)
    })
})