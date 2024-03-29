import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infra/customer/sequelize/model/customer-model";
import CustomerRepository from "../../../../infra/customer/sequelize/repository/customer-repository";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import FindCustomerUseCase from "./find-customer";

describe('Integration Test find customer usecase', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close()
  });

    test('should find a customer', async () => {
        const customerRepository = new CustomerRepository()  
        const usecase = new FindCustomerUseCase(customerRepository)

        const address = new Address("Street 1", 150, "123456-789", "São Paulo")
        const customer = new Customer("abc", "Leonardo", address)
        await customerRepository.create(customer.toJSON())
        
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
})