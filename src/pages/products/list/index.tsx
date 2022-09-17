import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, FAB, List, Paragraph, Text, Title } from 'react-native-paper';
import { CartProduct } from '../../../classes/cart';
import { Product } from '../../../classes/product';
import { addProduct, getCart } from '../../../repository/cart-repository';
import { deleteProduct, getProducts } from '../../../repository/product-repository';
import AppContext from '../../../services/app-context';
import styles from './styles';

const ListProductsPage = ({ navigation }: any) => {
  const { products, setProducts, setProductsEdit, cart, setCart } = useContext(AppContext);

  let productNotExcluded: Product[] = products.filter((p: Product) => !p.is_deleted)

  async function remove(product: Product) {
    await deleteProduct(product.id || 0)
    let produtos = await getProducts()
    setProducts(produtos)
  }

  async function addInCart(product: Product) {
    await addProduct(cart, product)
    let cartAux = await getCart()

    let c = cartAux.filter(c => !c.is_finished)
    setCart(c[0])
  }

  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
        {productNotExcluded.length ? productNotExcluded.map((p: Product, index: number) => (
          <Card key={index} style={styles.marginTop10}>
            <Card.Content>
              <Title>{p.name}</Title>
              <Paragraph>{p.description}</Paragraph>
              <Paragraph>{`R$ ${p.price.toFixed(2)}`}</Paragraph>
            </Card.Content>

            <Card.Actions>
              <Button icon="delete" color='#e74c3c' disabled={p.is_deleted} onPress={() => remove(p)}>
                Remover
              </Button>
              <Button icon="pencil" disabled={p.is_deleted} onPress={() => { setProductsEdit(p); navigation.navigate('Create') }}>
                Editar
              </Button>
              <Button icon="cart-plus" disabled={p.is_deleted || (cart && cart.cart_products.filter((cp: CartProduct) => cp.product_id === p.id).length)} onPress={() => { addInCart(p) }}>
                {(cart && cart.cart_products.filter((cp: CartProduct) => cp.product_id === p.id).length) ? "No Carrinho" : "Comprar"}
              </Button>
            </Card.Actions>
          </Card>
        )) : <List.Subheader>Nenhuma Categoria Cadastrada</List.Subheader>}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => { setProductsEdit(null); navigation.navigate('Create') }}
      />
    </View>
  );
};

export default ListProductsPage;