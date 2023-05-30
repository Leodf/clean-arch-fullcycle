import Customer from "../../../domain/customer/entity/customer";
import ValidatorInterface from "../../@shared/validators/validator-interface";
import CustomerYupValidator from "../validator/customer-validator-yup";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}