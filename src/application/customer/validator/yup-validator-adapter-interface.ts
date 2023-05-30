import { CustomerYupDto } from "./customer-validator-dto";

export default interface YupValidatorAdapter {
  validate(value: CustomerYupDto): void | string[]
}