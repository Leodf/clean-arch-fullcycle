type Address = {
    street: string
    number: number
    zip: string
    city: string
}

export interface InputCustomerRepositoryDto {
    id: string
    name: string
    address: Address
    active: boolean
    rewardPoints: number
}

export interface OutputCustomerRepositoryDto {
    id: string
    name: string
    address: Address
    active: boolean
    rewardPoints: number
}