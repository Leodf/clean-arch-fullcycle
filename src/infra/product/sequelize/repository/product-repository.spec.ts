import { Sequelize } from "sequelize-typescript"
import ProductModel from "../model/product-model"
import ProductA from "../../../../domain/product/entity/product-a"
import ProductRepository from "./product-repository"

describe('Product repository test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })
    test('should create a product', async () => {
        const productRepository = new ProductRepository()
        const product = new ProductA("1", "Product 1", 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"}, rejectOnEmpty: true })

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })
    })
    test('should update a product', async () => {
        const productRepository = new ProductRepository()
        const product = new ProductA("1", "Product 1", 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"}, rejectOnEmpty: true})

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })

        product.changeName("Product 2")
        product.changePrice(200)

        await productRepository.update(product)

        const updatedProductModel = await ProductModel.findOne({ where: {id: "1"}, rejectOnEmpty: true})

        expect(updatedProductModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        })
    })
    test('should find a product', async () => {
        const productRepository = new ProductRepository()
        const product = new ProductA("1", "Product 1", 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"},
    rejectOnEmpty: true})
        
        const foundProduct = await productRepository.find("1")
        
        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        })
    })
    test('should not find a product', async () => {
        const productRepository = new ProductRepository()
        await expect(() => productRepository.find("2")).rejects.toThrow("Product not found")
    })
    test('should find all products', async () => {
        const productRepository = new ProductRepository()
        const product = new ProductA("1", "Product 1", 100)
        await productRepository.create(product)
        const product2 = new ProductA("2", "Product 2", 200)
        await productRepository.create(product2)

        const foundProducts = await productRepository.findAll()
        
        const products = [product.toJSON(), product2.toJSON()]

        expect(products).toEqual(foundProducts)
    })
})