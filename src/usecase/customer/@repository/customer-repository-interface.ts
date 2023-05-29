import RepositoryInterface from "../../@shared/repository/repository-interface";
import { InputCustomerRepositoryDto, OutputCustomerRepositoryDto } from "./customer-repository-dto";

export default interface CustomerRepositoryInterface extends RepositoryInterface<InputCustomerRepositoryDto, OutputCustomerRepositoryDto> {}