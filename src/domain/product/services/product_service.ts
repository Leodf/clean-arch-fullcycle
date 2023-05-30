import ProductA from "../entity/product-a";

export default class ProductService {
    static increasePrice(products: ProductA[], percentage: number): ProductA[] {
        products.forEach(product => {
            product.changePrice((product.price * percentage)/100 + product.price)
        })
        return products
    }
}