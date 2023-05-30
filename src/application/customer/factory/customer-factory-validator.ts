import Customer from "../../../domain/customer/entity/customer";
import CustomerYupValidator from "../../../infra/customer/yupValidator/customer-validator-yup";
import ValidatorInterface from "../../@shared/validators/validator-interface";
import CustomerValidator from "../validator/customer-validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    const yupValidatorAdapter = new CustomerYupValidator()
    return new CustomerValidator(yupValidatorAdapter)
  }
}