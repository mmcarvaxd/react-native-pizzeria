import React, { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, FAB, List, Paragraph, Text, Title } from 'react-native-paper';
import { CartProduct } from '../../../classes/cart';
import { Product } from '../../../classes/product';
import { addProduct, getCart } from '../../../repository/cart-repository';
import { deleteProduct, getProducts } from '../../../repository/product-repository';
import AppContext from '../../../services/app-context';
import styles from './styles';
import DropDown from "react-native-paper-dropdown";
import { Category } from '../../../classes/category';

const ListProductsPage = ({ navigation }: any) => {
  const { products, setProducts, setProductsEdit, cart, setCart, categories } = useContext(AppContext);
  const [ showDropDown, setShowDropDown ] = useState(false);
  const [ category, setCategory ] = useState<number>(0)

  let productNotExcluded: Product[] = products.filter((p: Product) => (!p.is_deleted && (!category || p.category_id === category)))

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

  const categoryList: any[] = [{
    value: 0,
    label: "Todos"
  }];

  categories.forEach((c: Category) => {
    !c.is_deleted ? categoryList.push({
      value: c.id,
      label: c.description
    }) : null
  })

  return (
    <View style={{ height: '100%' }}>
      <ScrollView style={{ height: '100%' }}>
        <List.Subheader>Filtro</List.Subheader>
        <DropDown
          label={"Categoria"}
          mode={"flat"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={category}
          setValue={setCategory}
          list={categoryList}
        />
        <List.Subheader>Produtos</List.Subheader>
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
        )) : <List.Subheader>Nenhum Produto Cadastrado</List.Subheader>}

        <View style={{ height: 300 }}>
        </View>
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