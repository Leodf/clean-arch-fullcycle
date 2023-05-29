import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "../model/customer-model";
import CustomerRepository from "./customer-repository";

const mockCustomer = () => {
  const customer = new Customer("123", "Customer 1");
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  customer.changeAddress(address)
  return customer
}
describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = mockCustomer()
    await customerRepository.create(mockCustomer().toJSON())
    const customerModel = await CustomerModel.findOne(
      { 
        where: { id: "123" },
        rejectOnEmpty: true
      }
    )

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  test("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = mockCustomer()
    await customerRepository.create(mockCustomer().toJSON())
    customer.changeName("Customer 2")
    await customerRepository.update(customer.toJSON())
    const customerModel = await CustomerModel.findOne(
      { 
        where: { id: "123" },
        rejectOnEmpty: true
      }
    )

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  test("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = mockCustomer()
    await customerRepository.create(mockCustomer().toJSON())
    const customerResult = await customerRepository.find(customer.id);
    
    expect(customerResult).toStrictEqual(customer.toJSON())
  });

  test("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  test("should find all customers", async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = mockCustomer()
    customer1.addRewardPoints(10)
    customer1.activate()
    await customerRepository.create(customer1.toJSON())
    const customers = await customerRepository.findAll()
    expect(customers).toHaveLength(1)
    expect(customers).toContainEqual(customer1.toJSON())
  })
})