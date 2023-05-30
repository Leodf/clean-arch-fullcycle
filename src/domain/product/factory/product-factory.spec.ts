import ProductFactory from "./product-factory";

const mockProduct = () => ({
    name: "Product A",
    price: 10
})
const mockProductB = () => ({
    name: "Product A",
    price: 10
})

describe('Product factory unit test', () => {
    test('should create a product type A', () => {
        const input = mockProduct()
        const product = ProductFactory.create(input)
    
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(10);
        expect(product.constructor.name).toBe("ProductA");
    })
    test('should create a product type B', () => {
        const input = mockProductB()
        input.name = "Product B"
        const product = ProductFactory.create(input, "b")

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(20);
        expect(product.constructor.name).toBe("ProductB");
    })
    test("should throw an error when product type is not supported", () => {
        const input = mockProductB()
        expect(() => ProductFactory.create(input, "c")).toThrowError(
            "Product type not supported"
        )
    })
})