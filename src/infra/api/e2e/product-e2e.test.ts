import { app, sequelize } from '../app'
import request from 'supertest'

describe('E2E test for products', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })
    afterAll(async () => {
        await sequelize.close()
    })
    it('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Product E2E',
                price: "125.25"
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Product E2E')
        expect(response.body.price).toBe(125.25)
    })
    it('should not create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Product E2E',
            })
        expect(response.status).toBe(500)
    })
    it("should list all products", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: 'Product E2E 1',
                price: "125.25"
            });
        expect(response.status).toBe(200)
        const response2 = await request(app)
            .post("/products")
            .send({
                name: 'Product E2E 2',
                price: "200.25"
            })
        expect(response2.status).toBe(200)

        const listResponse = await request(app).get("/products").send()
        console.log(listResponse.body)
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.products.length).toBe(2)
        const product = listResponse.body.products[0]
        expect(product.name).toBe("Product E2E 1")
        expect(product.price).toBe(125.25)
        const product2 = listResponse.body.products[1]
        expect(product2.name).toBe("Product E2E 2")
        expect(product2.price).toBe(200.25)
    })
})