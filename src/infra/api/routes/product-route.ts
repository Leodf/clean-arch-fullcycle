import express, {Request, Response} from 'express'
import CreateProductUseCase from '../../../application/product/create/create-product'
import ListProductUseCase from '../../../application/product/list/list-product'
import ProductRepository from '../../product/sequelize/repository/product-repository'


export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository())
    try {
        const productDto = {
            name: req.body.name,
            price: parseFloat(req.body.price),
        }
        const output = await useCase.execute(productDto)
        res.status(200).send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})
productRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository())
    try {
        const output = await useCase.execute({})
        
        res.status(200).send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})