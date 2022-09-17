import { Product } from "../classes/product";

export function validateProduct(product: Product): any {
    if (product.name.length < 3) {
        return "O nome deve ter ao minimo 3 caracteres!";
    }

    if (product.description.length < 3) {
        return "A descrição deve ter ao minimo 3 caracteres!";
    }

    if (!product.price || product.price <= 0) {
        return "O preço está inválido";
    }

    if(!product.category_id) {
        return "Selecione uma categoria";
    }

    return false
}