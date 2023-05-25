import Mapper  from "./mapper"

const customer: Object = {
    id: 1,
    name: 'Customer 1',
    address: {
        street: 'Street 1',
        number: 1,
        zip: "123456-789",
        city: 'City 1'
    }
}
const customer2: Object = {
    id: 2,
    name: 'Customer 2',
    address: {
        street: 'Street 2',
        number: 2,
        zip: "123456-789",
        city: 'City 2'
    }
}
describe('Unit test for mapperHelper', () => {
    test('should return a list of the Object', () => {
        const customers = [customer, customer2]
        const model = new Mapper<Object>().aggregates(customers)

        expect(model).toEqual(customers)
    })
})