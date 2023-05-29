
import ProductFactory from "../../../domain/product/factory/product-factory";
import ProductRepositoryInterface from "../@repository/product-repository-interface";
import { InputListProductDto, OutputListProductDto } from "./list-product-dto";

export default class ListProductUseCase {

  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const productsData = await this.productRepository.findAll()
    const products = productsData.map(product => {
      return ProductFactory.create(product)
    })
    
    return {
      products: products
    }
  }
}