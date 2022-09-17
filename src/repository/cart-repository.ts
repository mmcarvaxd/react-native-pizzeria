import moment from "moment";
import { Cart, CartDBMapper, CartProduct } from "../classes/cart";
import { Product } from "../classes/product";
import { execQuery } from "./dbConnection";

export async function getCart(): Promise<Cart[]> {
    const query = 'SELECT c.id as id, c.created_at as created_at, c.is_finished as is_finished, cp.id as cpid, cp.cart_id as cpcart_id, cp.product_id as cpproduct_id, cp.quantity as cpquantity, p.id as pid, p.name as pname, p.description as pdescription, p.price as pprice, p.category_id as pcategory_id, p.is_deleted as pis_deleted, ct.id as ctid, ct.description as ctdescription, ct.is_deleted as ctis_deleted FROM tbCart c left join tbCartProducts cp on cp.cart_id = c.id left join tbProducts p on p.id = cp.product_id left join tbCategories ct on ct.id = p.category_id;'
    // const query = 'delete from tbCart'

    let response = await execQuery(query, [])
    let fromDb: any[] = []
    let cart: Cart[] = []

    for (let n = 0; n < response.rows.length; n++) {        
        fromDb.push({
            id: response.rows.item(n).id,
            created_at: response.rows.item(n).created_at,
            is_finished: response.rows.item(n).is_finished,
            cpid: response.rows.item(n).cpid,
            cpcart_id: response.rows.item(n).cpcart_id,
            cpproduct_id: response.rows.item(n).cpproduct_id,
            cpquantity: response.rows.item(n).cpquantity,
            pid: response.rows.item(n).pid,
            pname: response.rows.item(n).pname,
            pdescription: response.rows.item(n).pdescription,
            pprice: response.rows.item(n).pprice,
            pcategory_id: response.rows.item(n).pcategory_id,
            pis_deleted: response.rows.item(n).pis_deleted,
            ctid: response.rows.item(n).ctid,
            ctdescription: response.rows.item(n).ctdescription,
            ctis_deleted: response.rows.item(n).ctis_deleted,
        });
    }

    let carts_id: any[] = []
    let cartsGroup: any[] = []

    fromDb.forEach(fb => !(carts_id.includes(fb.id)) ? carts_id.push(fb.id) : null)

    carts_id.forEach(ci => {
        cartsGroup.push(fromDb.filter(fb => fb.id === ci))
    })

    cartsGroup.forEach(cg => {
        cart.push(CartDBMapper(cg))
    })

    return cart
}

export async function createCart(): Promise<void> {
    const query = 'insert into tbCart (created_at, is_finished) values (?, ?)'
    await execQuery(query, [moment(new Date()).format('YYYY-MM-DD'), false])

    return
}

export async function updateCart(cart: Cart): Promise<void> {
    const query = 'update tbCart set is_finished=? where id=?'
    await execQuery(query, [cart.is_finished, cart.id])
    
    return
}

export async function deleteCart(id: Number): Promise<void> {
    const query = 'delete from cart where id=?'
    await execQuery(query, [id])
    
    return
}

export async function addProduct(cart:Cart, product: Product): Promise<void> {
    const query = 'insert into tbCartProducts (cart_id, product_id) values (?, ?)'
    try {
        await execQuery(query, [cart.id, product.id])
        
    } catch (error) {
        console.log(error)
    }

    return
}

export async function removeProduct(id: number): Promise<void> {
    const query = 'delete from tbCartProducts where id=?'
    await execQuery(query, [id])

    return
}

export async function addProductQuantity(cartProduct:CartProduct): Promise<void> {
    const query = 'update tbCartProducts set quantity = quantity + 1 where id=?'
    await execQuery(query, [cartProduct.id])

    return
}

export async function removeProductQuantity(cartProduct:CartProduct): Promise<void> {
    const query = 'update tbCartProducts set quantity = quantity - 1 where id=?'
    await execQuery(query, [cartProduct.id])

    return
}


