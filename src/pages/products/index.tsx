import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Header from '../../components/header';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ListProductsPage from './list';
import CreateProductsPage from './create';

const Page1 = () => <Text>aaaaa</Text>
const Page2 = () => <Text>bbbbbb</Text>


const Routes = createAppContainer(
  createSwitchNavigator({
    List: ListProductsPage,
    Create: CreateProductsPage,
  })
);


const ProductsPage = () => {
  return (
    <View>
      <Header title='Produtos'></Header>
      <Routes></Routes>
    </View>
  );
};

export default ProductsPage;