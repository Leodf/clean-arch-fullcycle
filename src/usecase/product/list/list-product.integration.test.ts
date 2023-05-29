import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/sequelize/model/product-model";
import ProductRepository from "../../../infra/product/sequelize/repository/product-repository";
import ListProductUseCase from './list-product'
import Product from "../../../domain/product/entity/product";

describe('Integration Test list product usecase', () => {
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

    test('should list products', async () => {
        const productRepository = new ProductRepository() 
        
        const product = new Product("1", "Product 1", 100)
        await productRepository.create(product.toJSON())
        const product2 = new Product("2", "Product 2", 200)
        await productRepository.create(product2.toJSON())

        const usecase = new ListProductUseCase(productRepository)
        const input = {}
        const output = {"products": [product.toJSON(), product2.toJSON()]}
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
    test('should list an empty array of products', async () => {
        const productRepository = new ProductRepository() 
        const usecase = new ListProductUseCase(productRepository)
        const input = {}
        const output = {"products": []}
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
})