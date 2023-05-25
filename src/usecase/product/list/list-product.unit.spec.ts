import ListProductUseCase from "./list-product";

const product1 = {
    id: "1",
    name: "Product 1",
    price: 100,
}
const product2 = {
    id: "2",
    name: "Product 2",
    price: 200,
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    }
}

describe("Unit test for listing customer use case", () => {
    test("should list a customer", async () => {
        const productRepository = MockRepository()
        const listProductUseCase = new ListProductUseCase(productRepository)

        const output = await listProductUseCase.execute({})

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].price).toBe(product1.price)
        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].price).toBe(product2.price)
    })
})