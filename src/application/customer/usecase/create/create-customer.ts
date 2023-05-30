
import CustomerFactory from "../../factory/customer-factory";
import CustomerRepositoryInterface from "../../repository/customer-repository-interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create-customer-dto";

export default class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ){}

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const { name, address } = input
        const customer = CustomerFactory.createWithAddress(name, address)
        await this.customerRepository.create(customer.toJSON())

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city
            }
        }
    }
}