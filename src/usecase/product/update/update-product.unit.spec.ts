import ProductFactory from "../../../domain/product/factory/product-factory";
import UpdateProductUseCase from "./update-product";
import { InputUpdateProductDto } from "./update-product-dto";


const input: InputUpdateProductDto = {
    id: "abc",
    type: "a",
    name: "Product Update",
    price: 500,
}

const product = ProductFactory.create({
    id: "abc",
    type: "a",
    name: "Product",
    price: 100,
})

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test for customer update use case', () => {
    test('should update a customer', async () => {
        const productRepository = mockRepository()
        const updateCustomerUseCase = new UpdateProductUseCase(productRepository)
        const updateSpy = jest.spyOn(productRepository, "update")

        const output = await updateCustomerUseCase.execute(input)

        expect(updateSpy).toHaveBeenCalled()

        expect(output).toEqual({
            id: "abc",
            name: "Product Update",
            price: 500,
        })
    })
})