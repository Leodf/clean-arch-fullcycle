import CreateProductUseCase from "./create-product"

const mockInput = () => ({
    name: "Product Name",
    price: 100
})

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test create product use case', () => {
    test('should create a product', async () => {
        const input = mockInput()
        const productRepository = mockRepository()
        const createProductUseCase = new CreateProductUseCase(productRepository)
        const createSpy = jest.spyOn(productRepository, "create")
        const output = await createProductUseCase.execute(input)

        expect(createSpy).toHaveBeenCalled()
        expect(output).toEqual({
            id: expect.any(String),
            name: "Product Name",
            price: 100
        })
        const output2 = await createProductUseCase.execute(input, "b")

        expect(output2.price).toBe(200)
    })
    test('should not create a product with wrong type', async () => {
        const input = mockInput()
        const productRepository = mockRepository()
        const createProductUseCase = new CreateProductUseCase(productRepository)
        await expect(() => createProductUseCase.execute(input, "c")).rejects.toThrow("Product type not supported")
    })
    test('should not create a product with name is missing', async () => {
        const input = mockInput()
        const productRepository = mockRepository()
        const createProductUseCase = new CreateProductUseCase(productRepository)
        input.name = ""
        await expect(() => createProductUseCase.execute(input)).rejects.toThrow("Name is required")
    })
    test('should not create a product with price is negative', async () => {
        const input = mockInput()
        const productRepository = mockRepository()
        const createProductUseCase = new CreateProductUseCase(productRepository)
        input.price = -1
        await expect(() => createProductUseCase.execute(input)).rejects.toThrow("Price must be greater than zero")
    })
})