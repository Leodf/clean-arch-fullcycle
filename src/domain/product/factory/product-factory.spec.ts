import ProductFactory from "./product-factory";

const mockProduct = () => ({
    name: "Product A",
    price: 10
})
const mockProductB = () => ({
    type: "b",
    name: "Product A",
    price: 10
})

describe('Product factory unit test', () => {
    test('should create a product type A', () => {
        const input = mockProduct()
        const product = ProductFactory.create(input)
        console.log(product)
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(10);
        expect(product.constructor.name).toBe("Product");
    })
    test('should create a product type B', () => {
        const input = mockProductB()
        input.type = "b"
        input.name = "Product B"
        const product = ProductFactory.create(input)

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(20);
        expect(product.constructor.name).toBe("ProductB");
    })
    test("should throw an error when product type is not supported", () => {
        const input = mockProductB()
        input.type = "c"
        expect(() => ProductFactory.create(input)).toThrowError(
            "Product type not supported"
        )
    })
})