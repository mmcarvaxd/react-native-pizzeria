import { Category } from "../classes/category";

export function validateCategory(category: Category): any {
    if (category.description.length < 3) {
        return "A descrição deve ter ao minimo 3 caracteres!";
    }

    return false
}