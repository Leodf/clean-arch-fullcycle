import FindProductUseCase from "./find-product"

const mockOutput = () => ({
    id: "abc",
    name: "Product Name",
    price: 100
})

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(mockOutput())),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test find product use case', () => {
    test('should create a product', async () => {
        const productRepository = mockRepository()
        const findProductUseCase = new FindProductUseCase(productRepository)
        const findSpy = jest.spyOn(productRepository, "find")
        const input = {
            id: "abc"
        }
        const output = await findProductUseCase.execute(input)

        expect(findSpy).toHaveBeenCalled()
        expect(output).toEqual({
            id: "abc",
            name: "Product Name",
            price: 100
        })
    })
    test('should not found a product', async () => {
        const productRepository = mockRepository()
        productRepository.find.mockImplementation(() => {throw new Error("Product not found")})
        const findProductUseCase = new FindProductUseCase(productRepository) 
        const input = {
            id: "cba"
        }
        expect(() => { 
            return findProductUseCase.execute(input) 
        }).rejects.toThrow("Product not found")
    })
})