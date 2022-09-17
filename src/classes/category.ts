export interface Category {
    id?: number
    description: string
    is_deleted: boolean
}

export function CategoryDBMapper(dbObject: any): Category {
    return {
        id: dbObject.id,
        description: dbObject.description,
        is_deleted: dbObject.is_deleted
    }
}