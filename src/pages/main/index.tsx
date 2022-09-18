import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import CartPage from '../cart';
import CategoriesPage from '../categories';
import CartFinishedPage from '../finished-carts';
import ProductsPage from '../products';

const ProductsRoute = (...props: any) => <ProductsPage {...props} />;

const Main = (props: any) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'products', title: 'Produtos', icon: 'pizza' },
        { key: 'categories', title: 'Categorias', icon: 'format-list-bulleted' },
        { key: 'cart', title: 'Carrinho', icon: 'cart-outline' },
        { key: 'finished', title: 'Meus Pedidos', icon: 'cart-heart' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        products: ProductsRoute,
        categories: CategoriesPage,
        cart: CartPage,
        finished: CartFinishedPage
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Main;