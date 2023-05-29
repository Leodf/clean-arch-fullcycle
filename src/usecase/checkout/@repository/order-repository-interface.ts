import Order from "../../../domain/checkout/entity/order";
import RepositoryInterface from "../../@shared/repository/repository-interface";
import { InputOrderRepositoryDto, OutputOrderRepositoryDto } from "./order-repository-dto";

export default interface OrderRepositoryInterface extends RepositoryInterface<InputOrderRepositoryDto, OutputOrderRepositoryDto> {}