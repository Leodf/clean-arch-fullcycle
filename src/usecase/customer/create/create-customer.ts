import CustomerFactory from "../../../domain/customer/factory/customer-factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository-interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create-customer-dto";

export default class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ){}

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const { name, address } = input
        const customer = CustomerFactory.createWithAddress(name, address)
        await this.customerRepository.create(customer)

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