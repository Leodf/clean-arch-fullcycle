import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import AddressDto from "./customer-factory-address-dto";

export default class CustomerFactory {
    public static create(name: string, id = uuid()): Customer {
        return new Customer(id, name)
    }

    public static createWithAddress(name: string, addressDto: AddressDto, id = uuid()): Customer {
        const { street, number, zip, city } = addressDto
        const address = new Address(street, number, zip, city)
        const customer = new Customer(id, name, address)
        return customer
    }
}