import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infra/customer/sequelize/model/customer-model";
import CustomerRepository from "../../../../infra/customer/sequelize/repository/customer-repository";
import CreateCustomerUseCase from "./create-customer";

describe('Integration Test create customer usecase', () => {
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

    test('should create a customer', async () => {
        const customerRepository = new CustomerRepository()  
        const usecase = new CreateCustomerUseCase(customerRepository)
        const input = {
            name: "Leonardo",
            address: {
                street: "Street 1",
                number: 150,
                zip: "123456-789",
                city: "São Paulo"
            }
        }  
        
        const result = await usecase.execute(input)
        expect(result).toEqual({
            id: expect.any(String),
            name: "Leonardo",
            address: {
                street: "Street 1",
                number: 150,
                zip: "123456-789",
                city: "São Paulo"
            }
        })
    })
})