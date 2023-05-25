import customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import ProductFactory from "../../../domain/product/factory/product-factory"
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface"
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update-product-dto"

export default class UpdateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ){}

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto>{
        const productData = await this.productRepository.find(input.id)
        const product = ProductFactory.create({
            id: productData.id,
            type: input.type,
            name: productData.name,
            price: productData.price
        })
        product.changeName(input.name)
        product.changePrice(input.price)
        await this.productRepository.update(product)
        return {
            id: product.id,
            name: product.name,
            price: product.price
        } 
    }
}