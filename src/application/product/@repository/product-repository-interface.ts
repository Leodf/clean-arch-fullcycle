import RepositoryInterface from "../../@shared/repository/repository-interface";
import { InputProductRepositoryDto, OutputProductRepositoryDto } from "./product-repository-dto";

export default interface ProductRepositoryInterface extends RepositoryInterface<InputProductRepositoryDto, OutputProductRepositoryDto> {}