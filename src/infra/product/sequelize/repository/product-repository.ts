import { InputProductRepositoryDto, OutputProductRepositoryDto } from "../../../../usecase/product/@repository/product-repository-dto";
import ProductRepositoryInterface from "../../../../usecase/product/@repository/product-repository-interface";
import ProductModel from "../model/product-model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: InputProductRepositoryDto): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }
    async update(entity: InputProductRepositoryDto): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }
    async find(id: string): Promise<OutputProductRepositoryDto> {
        try {
            const productModel = await ProductModel.findOne({ where: { id } })
            return {
                ...productModel.toJSON()
            }
        } catch (error) {
            throw new Error("Product not found");
        } 
    }
    async findAll(): Promise<OutputProductRepositoryDto[]> {
        const productModels = await ProductModel.findAll()
        return productModels
        .map(
            (productModel) => ({
                id: productModel.id,
                name: productModel.name,
                price: productModel.price
            })
        )
    }
}