import { Category, CategoryDBMapper } from "../classes/category";
import { execQuery } from "./dbConnection";

export async function getCategories(): Promise<Category[]> {
    const query = 'SELECT * FROM tbCategories;'
    let response = await execQuery(query, [])

    let categories: Category[] = []

    for (let n = 0; n < response.rows.length; n++) {        
        categories.push(CategoryDBMapper(response.rows.item(n)));
    }

    return categories
}

export async function createCategory(category: Category): Promise<void> {
    const query = 'insert into tbCategories (description) values (?)'
    await execQuery(query, [category.description])

    return
}

export async function updateCategory(category: Category): Promise<void> {
    const query = 'update tbCategories set description=?, is_deleted=? where id=?'
    await execQuery(query, [category.description, category.is_deleted, category.id])
    
    return
}

export async function deleteCategory(id: Number): Promise<void> {
    const query = 'delete from tbCategories where id=?'
    await execQuery(query, [id])
    
    return
}