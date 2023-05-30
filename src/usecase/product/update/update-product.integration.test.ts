import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/sequelize/model/product-model";
import ProductRepository from "../../../infra/product/sequelize/repository/product-repository";
import UpdateProductUseCase from './update-product'
import ProductA from "../../../domain/product/entity/product-a";

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

    test('should update a product', async () => {
        const productRepository = new ProductRepository()
        const product = new ProductA("1", "Product 1", 100)
        await productRepository.create(product.toJSON())
        const usecase = new UpdateProductUseCase(productRepository)
        const input = {
          id: product.id,
          name: "Product Updated",
          price: 200
        }
        const output = {
          id: product.id,
          name: "Product Updated",
          price: 200
        }
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
})