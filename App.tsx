import { Provider as PaperProvider } from 'react-native-paper';
import AppContext from './src/services/app-context';
import Main from './src/pages/main';
import { useEffect, useState } from 'react';
import { Category } from './src/classes/category';

import { LogBox } from 'react-native';
import { runMigrationCart, runMigrationCartProducts, runMigrationCategories, runMigrationProduct } from './src/repository/dbConnection';
import { getCategories } from './src/repository/category-repository';
import { Product } from './src/classes/product';
import { getProducts } from './src/repository/product-repository';
import { Cart } from './src/classes/cart';
import { createCart, getCart } from './src/repository/cart-repository';
LogBox.ignoreAllLogs();

export default function App() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryEdit, setCategoryEdit] = useState<any>(undefined)

  const [products, setProducts] = useState<Product[]>([])
  const [productsEdit, setProductsEdit] = useState<any>(undefined)

  const [cart, setCart] = useState<Cart | null>(null)
  const [carts, setCarts] = useState<Cart[]>([])

  const providers = {
    categories,
    setCategories,
    categoryEdit, 
    setCategoryEdit,

    products, 
    setProducts,
    productsEdit, 
    setProductsEdit,

    cart, 
    setCart,

    carts, 
    setCarts
  }

  let isAlreadyMigrated = false;

  async function funcUseEffect() {
    if (!isAlreadyMigrated) {
      isAlreadyMigrated = true;
      await runMigrationProduct();
      await runMigrationCart();
      await runMigrationCartProducts();
      await runMigrationCategories();
    }

    await loadParamters()
  }

  async function loadParamters() {
    let categories = await getCategories()
    let products = await getProducts()
    let cartAux = await getCart()

    let c = cartAux.filter(c => !c.is_finished)
    console.log(c)
    if(!c.length) {
      await createCart()

      cartAux = await getCart()

      c = cartAux.filter(c => !c.is_finished)
    }

    setCategories(categories)
    setProducts(products)
    setCart(c[0])
    setCarts(cartAux)
  }

  useEffect(() => {
    funcUseEffect();
  }, []);

  return (
    <AppContext.Provider value={providers}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </AppContext.Provider>
  );
}

