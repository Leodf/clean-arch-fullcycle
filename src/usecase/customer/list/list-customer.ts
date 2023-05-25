import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository-interface";
import Mapper from "../../@shared/mapper";
import { InputListCustomerDto, OutputListCustomerDto } from "./list-customer-dto";

export default class ListCustomerUseCase {

  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    const output = new Mapper<Customer>().aggregates(customers)
    
    return {
      customers: output
    }
  }
}