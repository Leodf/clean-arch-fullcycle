import CustomerRepositoryInterface from "../../repository/customer-repository-interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list-customer-dto";

export default class ListCustomerUseCase {

  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    
    return {
      customers: customers
    }
  }
}