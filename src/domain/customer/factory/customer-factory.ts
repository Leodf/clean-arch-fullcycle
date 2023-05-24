import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import AddressDto from "./customer-address-dto";

export default class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer(uuid(), name)
    }

    public static createWithAddress(name: string, addressDto: AddressDto): Customer {
        const { street, number, zip, city } = addressDto
        const address = new Address(street, number, zip, city)
        const customer = new Customer(uuid(), name, address)
        return customer
    }
}