import CustomerValidatorFactory from "../../../application/customer/factory/customer-factory-validator"
import Entity from "../../@shared/entity/abstract-entity"
import NotificationError from "../../@shared/notification/notification-error"
import Address from "../value-object/address"

export default class Customer extends Entity {
    private _name: string
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0
    
    constructor(id: string, name: string, address?: Address) {
        super()
        this._id = id
        this._name = name
        this._address = address
        this.validate()

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get name(){
        return this._name
    }

    validate() {
        CustomerValidatorFactory.create().validate(this)
    }

    get id(): string {
        return this._id
    }

    get address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    set address(address: Address) {
       this._address = address
    }
    
    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points 
    }

    isActive(): boolean {
        return this._active
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            address: this.address.toJSON(),
            active: this.isActive(),
            rewardPoints: this.rewardPoints
        }
    }
}