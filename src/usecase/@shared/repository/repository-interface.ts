export default interface RepositoryInterface<T, R> {
    create(entity: T): Promise<void>
    update(entity: T): Promise<void>
    find(id: string): Promise<R>
    findAll(): Promise<R[]>
}