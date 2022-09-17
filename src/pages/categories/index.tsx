import * as React from 'react';
import { View } from 'react-native';
import Header from '../../components/header';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ListCategoriesPage from './list';
import CreateProductsPage from './create';


const Routes = createAppContainer(
  createSwitchNavigator({
    List: ListCategoriesPage,
    Create: CreateProductsPage,
  })
);


const CategoriesPage = () => {
  return (
    <View>
      <Header title='Categorias'></Header>
      <Routes></Routes>
    </View>
  );
};

export default CategoriesPage;