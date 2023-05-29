import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/sequelize/model/product-model";
import FindProductUseCase from "./find-product";
import ProductRepository from "../../../infra/product/sequelize/repository/product-repository";
import ProductFactory from "../../../domain/product/factory/product-factory";

describe('Integration Test find product usecase', () => {
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

    test('should find a customer', async () => {
        const productRepository = new ProductRepository()  
        const usecase = new FindProductUseCase(productRepository)
        const product = ProductFactory.create({
            id: "abc",
            name: 'Product A',
            price: 1
        })
        
        await productRepository.create(product)
        
        const input = {
            id: "abc"
        }

        const output = {
            id: "abc",
            name: "Product A",
            price: 1
        }  
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
})