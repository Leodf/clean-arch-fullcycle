
export default class Mapper<T> {
    
    aggregates = (object: T[]): T[] => {
        return object.map(item => this.aggregate(item))
    }

    private aggregate = (object: T): T => {
        return object 
    }
}

