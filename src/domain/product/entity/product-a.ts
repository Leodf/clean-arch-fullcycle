import Entity from "../../@shared/entity/abstract-entity";
import NotificationError from "../../@shared/notification/notification-error";
import ProductInterface from "./product-interface";

export default class ProductA extends Entity implements ProductInterface {
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number) {
        super()
        this._id = id
        this._name = name
        this._price = price
        this.validate()

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    changeName(name: string): void {
        this._name = name
        this.validate()
    }

    changePrice(price: number): void {
        this._price = price
        this.validate()
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                message: "Id is required",
                context: "product"
            })
        }
        if (this._name.length === 0) {
            this.notification.addError({
                message: "Name is required",
                context: "product"
            })
        }
        if (this._price < 0) {
            this.notification.addError({
                message: "Price must be greater than zero",
                context: "product"
            })
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price
        }
    }
}