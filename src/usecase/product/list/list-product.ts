import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product-interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import Mapper from "../../@shared/mapper";
import { InputListProductDto, OutputListProductDto } from "./list-product-dto";

export default class ListProductUseCase {

  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    const output = new Mapper<ProductInterface>().aggregates(products)
    
    return {
      products: output
    }
  }
}