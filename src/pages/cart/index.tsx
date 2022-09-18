import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { List, IconButton, Appbar, Text, Button } from 'react-native-paper';
import { Cart, CartProduct } from '../../classes/cart';
import Header from '../../components/header';
import { addProductQuantity, createCart, getCart, removeProduct, removeProductQuantity, updateCart } from '../../repository/cart-repository';
import AppContext from '../../services/app-context';
import styles from './styles';


const CartPage = () => {
  const { cart, setCart, setCarts } = useContext(AppContext);

  async function removeFromCart(cartProduct: CartProduct) {
    await removeProduct(cartProduct.id || 0)
    let cartAux = await getCart()

    let c = cartAux.filter(c => !c.is_finished)
    setCart(c[0])
  }

  async function addProductQuantityy(product: CartProduct) {
    await addProductQuantity(product)
    let cartAux = await getCart()

    let c = cartAux.filter(c => !c.is_finished)
    setCart(c[0])
  }

  async function removeProductQuantityy(product: CartProduct) {
    await removeProductQuantity(product)
    let cartAux = await getCart()

    let c = cartAux.filter(c => !c.is_finished)
    setCart(c[0])
  }

  async function finalizeCart() {
    cart.is_finished = true
    await updateCart(cart)
    await createCart()
    let cartAux = await getCart()

    let c = cartAux.filter(c => !c.is_finished)
    setCarts(cartAux)
    setCart(c[0])
  }

  let total = 0

  cart.cart_products?.forEach((cp: CartProduct) => {
    if (cp.product) {
      total += (cp.quantity * cp.product.price)
    }
  });

  return (
    <View>
      <Header title='Carrinho'></Header>
      <View style={{height: '100%'}}>
        <Appbar style={styles.totalContainer} theme={{ colors: { primary: '#6c5ce7' } }}>
          <Text style={{ color: 'white' }}>Total: R$ {total.toFixed(2).toString()}</Text>
          <Button color='white' icon="cart-check" disabled={!cart.cart_products?.length} onPress={() => { finalizeCart() }}>
            Finalizar
          </Button>
        </Appbar>
        <ScrollView>
          {
            cart.cart_products?.length ? cart.cart_products?.map((cp: CartProduct, index: number) => (
              <List.Item
                key={index}
                title={cp.product?.name}
                description={cp.product?.description}
                left={_ => <IconButton
                  icon="delete"
                  color="#e74c3c"
                  size={20}
                  onPress={() => removeFromCart(cp)}
                />}

                right={_ => (
                  <View style={styles.alignButtons}>
                    <IconButton
                      icon="minus"
                      size={20}
                      disabled={cp.quantity === 1}
                      onPress={() => removeProductQuantityy(cp)}
                    />
                    <Text>{cp.quantity}</Text>
                    <IconButton
                      icon="plus"
                      size={20}
                      onPress={() => addProductQuantityy(cp)}
                    />
                  </View>
                )}
              />
            )) : <List.Subheader>Nenhuma produto no carrinho :(</List.Subheader>
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default CartPage;