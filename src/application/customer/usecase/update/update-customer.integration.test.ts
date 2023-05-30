import { Sequelize } from "sequelize-typescript";

import UpdateCustomerUseCase from "./update-customer";
import CustomerModel from "../../../../infra/customer/sequelize/model/customer-model";
import CustomerRepository from "../../../../infra/customer/sequelize/repository/customer-repository";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";


describe('Integration Test update customer usecase', () => {
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

    test('should update a customer', async () => {
        const customerRepository = new CustomerRepository()
        const address = new Address("Street 1", 150, "123456-789", "São Paulo")
        const customer = new Customer("abc", "Leonardo", address)
        await customerRepository.create(customer.toJSON())

        const usecase = new UpdateCustomerUseCase(customerRepository)
        const input = {
            id: customer.id,
            name: "Leonardo Updated",
            address: {
                street: "Street 2 Updated",
                number: 222,
                zip: "123456-789",
                city: "Rio de Janeiro"
            }
        }  
        
        const result = await usecase.execute(input)
        expect(result).toEqual({
            id: expect.any(String),
            name: "Leonardo Updated",
            address: {
                street: "Street 2 Updated",
                number: 222,
                zip: "123456-789",
                city: "Rio de Janeiro"
            }
        })
    })
})