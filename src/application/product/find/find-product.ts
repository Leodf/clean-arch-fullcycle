
import ProductFactory from "../../../domain/product/factory/product-factory";
import ProductRepositoryInterface from "../@repository/product-repository-interface";
import { InputFindProductDto, OutputFindProductDto } from "./find-product-dto";

export default class FindProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ){}

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const productData = await this.productRepository.find(input.id)
        const product = ProductFactory.create({...productData})

        return product.toJSON()
    }
}