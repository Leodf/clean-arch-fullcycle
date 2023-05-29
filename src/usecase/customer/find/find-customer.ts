import CustomerRepositoryInterface from "../@repository/customer-repository-interface"
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find-customer-dto"

export default class FindCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ){}

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepository.find(input.id)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }
    }
}