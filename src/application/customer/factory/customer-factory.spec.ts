import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "./customer-factory";

describe('Customer factory unit test', () => {
    test('should create a customer', () => {
        const customer = CustomerFactory.create("Leonardo")

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Leonardo");
        expect(customer.address).toBeUndefined();
    })
    test("should create a customer with an address", () => {
        const address = {
            street: "Street",
            number: 1, 
            zip: "13330-250", 
            city: "São Paulo"
        }

        const customer = CustomerFactory.createWithAddress("Leonardo", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Leonardo");
        expect(customer.address).toEqual({
            _street: "Street",
            _number: 1, 
            _zip: "13330-250", 
            _city: "São Paulo"
        });
    });
})