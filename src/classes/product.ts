import { Category } from "./category"

export interface Product {
    id?: number
    name: string
    description: string
    price: number
    category_id: number
    category?: Category
    is_deleted: boolean
}

export function ProductDBMapper(dbObject: any): Product {
    return {
        id: dbObject.id,
        name: dbObject.name,
        description: dbObject.description,
        price: dbObject.price,
        category_id: dbObject.category_id,
        is_deleted: dbObject.is_deleted
    }
}