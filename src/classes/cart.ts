import moment from "moment"
import { Product } from "./product"

export interface Cart {
    id?: number
    created_at: Date
    is_finished: boolean
    cart_products?: CartProduct[]
}

export interface CartProduct {
    id?: number
    cart_id: number
    product_id: number
    quantity: number
    product?: Product
}

export function CartProductDBMapper(dbObject: any): CartProduct {
    return {
        id: dbObject.id,
        cart_id: dbObject.cart_id,
        product_id: dbObject.product_id,
        quantity: dbObject.quantity
    }
}

export function CartDBMapper(dbObject: any): Cart {

    let cart: Cart = {
        created_at: dbObject[0].created_at,
        is_finished: dbObject[0].is_finished,
        id: dbObject[0].id,
        cart_products: []
    }

    dbObject.forEach((db: any) => {
        if(db.cpcart_id) {
            cart.cart_products?.push({
                cart_id: db.cpcart_id,
                product_id: db.cpproduct_id,
                quantity: db.cpquantity,
                id: db.cpid,
                product: {
                    category_id: db.pcategory_id,
                    description: db.pdescription,
                    is_deleted: db.pis_deleted,
                    name: db.pname,
                    price: db.pprice,
                    id: db.pid,
                    category: {
                        description: db.ctdescription,
                        is_deleted: false,
                        id: db.ctid
                    }
                }
            })
        }
    })

    return cart
}