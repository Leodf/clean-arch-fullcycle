type ItemDto = {
    id: string
    name: string
    price: number
    productId: string
    quantity: number
}
export interface InputOrderRepositoryDto {
    id: string
    customerId: string
    total: number
    items: ItemDto[]
}
export interface OutputOrderRepositoryDto {
    id: string
    customerId: string
    total: number
    items: ItemDto[]
}