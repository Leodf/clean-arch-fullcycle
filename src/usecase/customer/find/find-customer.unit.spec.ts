import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import FindCustomerUseCase from "./find-customer";

const address = new Address("Street 1", 150, "123456-789", "São Paulo")
const customer = new Customer("abc", "Leonardo", address)

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test find customer usecase', () => {

    test('should find a customer', async () => {
        const customerRepository = mockRepository()  
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "abc"
        }

        const output = {
            id: "abc",
            name: "Leonardo",
            address: {
                street: "Street 1",
                number: 150,
                zip: "123456-789",
                city: "São Paulo"
            }
        }  
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
    test('should not found a customer', async () => {
        const customerRepository = mockRepository()  
        customerRepository.find.mockImplementation(() => {throw new Error("Customer not found")})
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "abc"
        }

        expect(() => { 
            return usecase.execute(input) 
        }).rejects.toThrow("Customer not found")
    })
})