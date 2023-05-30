
import Address from "../../../../domain/customer/value-object/address";
import CustomerFactory from "../../factory/customer-factory";
import CustomerRepositoryInterface from "../../repository/customer-repository-interface";
import {InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update-customer-dto";


export default class UpdateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ){}

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto>{
        const customerData = await this.customerRepository.find(input.id)
        const customer = CustomerFactory.createWithAddress(customerData.name, customerData.address, customerData.id)
        customer.changeName(input.name)
        customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city))
        await this.customerRepository.update(customer.toJSON())
        
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