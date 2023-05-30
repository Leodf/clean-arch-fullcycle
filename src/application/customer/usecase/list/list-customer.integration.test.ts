import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infra/customer/sequelize/model/customer-model";
import CustomerRepository from "../../../../infra/customer/sequelize/repository/customer-repository";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import ListCustomerUseCase from "./list-customer";

describe('Integration Test list customer usecase', () => {
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

    test('should list an array of customers', async () => {
        const customerRepository = new CustomerRepository()  
        const usecase = new ListCustomerUseCase(customerRepository)
        const address = new Address("Street 1", 150, "123456-789", "São Paulo")
        const customer = new Customer("abc", "Leonardo", address)
        await customerRepository.create(customer.toJSON())
        const address2 = new Address("Street 2", 222, "123456-789", "Rio de Janeiro")
        const customer2 = new Customer("def", "Jane", address2)
        await customerRepository.create(customer2.toJSON())
        
        const input = {}

        const output = {"customers": [customer.toJSON(), customer2.toJSON()]}
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
})