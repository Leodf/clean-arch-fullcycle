import CustomerFactory from "../../factory/customer-factory";
import ListCustomerUseCase from "./list-customer";

const address1 = {
    street: "Street 1",
    number: 1,
    zip: "123456-789",
    city: "City 1",
}
const address2 = {
    street: "Street 2",
    number: 2,
    zip: "789456-123",
    city: "City 2",
}

const customer1 = CustomerFactory.createWithAddress(
    "John Doe",
    address1
);

const customer2 = CustomerFactory.createWithAddress(
    "Jane Doe",
    address2
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1.toJSON(), customer2.toJSON()])),
    };
};

describe("Unit test for listing customer use case", () => {
    test("should list a customer", async () => {
        const customerRepository = MockRepository();
        const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

        const output = await listCustomerUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });
});