import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/sequelize/model/product-model";
import ProductRepository from "../../../infra/product/sequelize/repository/product-repository";
import CreateProductUseCase from './create-product'

describe('Integration Test create product usecase', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close()
  });

    test('should create a product', async () => {
        const productRepository = new ProductRepository()  
        const usecase = new CreateProductUseCase(productRepository)
        const input = {
            name: "Product A",
            price: 100,
        }
        const output = {
            id: expect.any(String),
            name: "Product A",
            price: 100
        }  
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
})