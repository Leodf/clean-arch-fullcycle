import CreateCustomerUseCase from "./create-customer"

const input = {
    name: "Leonardo",
    address: {
        street: "Rua da Silva",
        number: 123,
        zip: "123456-789",
        city: "São Paulo",
    }
}

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test create customer use case', () => {
    test('should create a customer', async () => {
        const customerRepository = mockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        const output = await customerCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    })
    test('should throw an error when name is missing', async () => {
        const customerRepository = mockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        input.name = ""

        await expect(() => customerCreateUseCase.execute(input)).rejects.toThrow("Name is required")
    })
    test('should throw an error when street is missing', async () => {
        const customerRepository = mockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        input.address.street = ""

        await expect(() => customerCreateUseCase.execute(input)).rejects.toThrow("Street is required")
    })
})