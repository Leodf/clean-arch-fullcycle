import * as yup from 'yup'
import YupValidatorAdapter from '../../../application/customer/validator/yup-validator-adapter-interface'
import { CustomerYupDto } from '../../../application/customer/validator/customer-validator-dto'

export default class CustomerYupValidator implements YupValidatorAdapter {
  validate(entity: CustomerYupDto) {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          {
            abortEarly: false,
          }
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      return e.errors
    }
  }
}