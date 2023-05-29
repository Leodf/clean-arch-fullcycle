import ProductFactory from "../../../domain/product/factory/product-factory";
import ProductRepositoryInterface from "../@repository/product-repository-interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create-product-dto";

export default class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface,
    ){}

    async execute(input: InputCreateProductDto, typeProduct?: string): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(input, typeProduct)
        await this.productRepository.create(product.toJSON())

        return product.toJSON()
    }
}