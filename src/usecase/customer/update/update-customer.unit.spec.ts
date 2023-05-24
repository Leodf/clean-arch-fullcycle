import CustomerFactory from "../../../domain/customer/factory/customer-factory";
import UpdateCustomerUseCase from "./update-customer";
import { InputUpdateCustomerDto } from "./update-customer-dto";

const address = {
    street: "street",
    number: 123,
    zip: "123456-789",
    city: "São Paulo"
}
const customer = CustomerFactory.createWithAddress("Leonardo", address)

const input: InputUpdateCustomerDto = {
    id: customer.id,
    name: "Leonardo updated",
    address: {
        street: "street updated",
        number: 1234,
        zip: "789456-123",
        city: "Rio de Janeiro"
    }
}

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test for customer update use case', () => {
    test('should update a customer', async () => {
        const customerRepository = mockRepository()
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)

        const output = await updateCustomerUseCase.execute(input)

        expect(output).toEqual(input)

    })
})