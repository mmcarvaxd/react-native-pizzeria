import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import CategoriesPage from '../categories';
import ProductsPage from '../products';

const ProductsRoute = (...props: any) => <ProductsPage {...props} />;

const Main = (props: any) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'products', title: 'Produtos', icon: 'pizza' },
        { key: 'categories', title: 'Categories', icon: 'format-list-bulleted' },
        { key: 'recents', title: 'Recents', icon: 'history' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        products: ProductsRoute,
        categories: CategoriesPage,
        recents: CategoriesPage,
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