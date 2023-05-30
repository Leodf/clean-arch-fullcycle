import Customer from "../../../domain/customer/entity/customer";
import ValidatorInterface from "../../@shared/validators/validator-interface";
import * as yup from 'yup'
import YupValidatorAdapter from "./yup-validator-adapter-interface";

export default class CustomerValidator implements ValidatorInterface<Customer> {

  constructor(
    private readonly yupValidatorAdapter: YupValidatorAdapter
  ) { }

  validate(entity: Customer): void {

    const errors = this.yupValidatorAdapter.validate({
      id: entity.id,
      name: entity.name
    })
    if (errors) {
      errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error
        })
      })
    }
  }
}