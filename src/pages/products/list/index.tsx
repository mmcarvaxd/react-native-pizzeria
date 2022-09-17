import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Card, FAB, List, Paragraph, Text, Title } from 'react-native-paper';
import { Product } from '../../../classes/product';
import { deleteProduct, getProducts } from '../../../repository/product-repository';
import AppContext from '../../../services/app-context';
import styles from './styles';

const ListProductsPage = ({ navigation }: any) => {
  const { products, setProducts, setProductsEdit } = useContext(AppContext);

  let productNotExcluded: Product[] = products.filter((p: Product) => !p.is_deleted)

  async function remove(product: Product) {
    await deleteProduct(product.id || 0)
    let produtos = await getProducts()
    setProducts(produtos)
  }

  return (
    <View style={{ height: '100%' }}>
      {productNotExcluded.length ? productNotExcluded.map((p: Product, index: number) => (
        <Card key={index} style={styles.marginTop10}>
          <Card.Content>
            <Title>{p.name}</Title>
            <Paragraph>{p.description}</Paragraph>
            <Paragraph>{`R$ ${p.price}`}</Paragraph>
          </Card.Content>

          <Card.Actions>
            <Button icon="delete" color='#e74c3c' disabled={p.is_deleted} onPress={() => remove(p)}>
              Remover
            </Button>
            <Button icon="pencil" disabled={p.is_deleted} onPress={() => {setProductsEdit(p); navigation.navigate('Create')}}>
              Editar
            </Button>
          </Card.Actions>
        </Card>
      )) : <List.Subheader>Nenhuma Categoria Cadastrada</List.Subheader>}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {setProductsEdit(null); navigation.navigate('Create')}}
      />
    </View>
  );
};

export default ListProductsPage;