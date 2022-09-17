import { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, FAB, List, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { Category } from '../../../classes/category';
import { Product } from '../../../classes/product';
import { createProduct, getProducts, updateProduct } from '../../../repository/product-repository';
import AppContext from '../../../services/app-context';
import { validateProduct } from '../../../services/product-service';
import styles from './styles';

const CreateProductsPage = ({ navigation }: any) => {
  let product: Product = {
    category_id: 0,
    description: "",
    is_deleted: false,
    name: "",
    price: 0,
  }

  //States
  const { categories, setProducts, productsEdit } = useContext(AppContext);

  if(productsEdit) {
    product = productsEdit
  }

  const [name, setName] = useState<string>(product.name || '')
  const [description, setDescription] = useState<string>(product.description || '')
  const [price, setPrice] = useState<string>(product.price.toString().replace('.', ',') || '0')
  const [category, setCategory] = useState<number>(product.category_id || 0)
  const [showDropDown, setShowDropDown] = useState(false);

  const categoryList: any[] = [];

  categories.forEach((c: Category) => {
    !c.is_deleted ? categoryList.push({
      value: c.id,
      label: c.description
    }) : null
  })

  //Functions
  async function saveProduct() {
    product.category_id = category
    product.name = name
    product.price = Number(price.replace(',', '.'))
    product.description = description

    var isInvalid = validateProduct(product)
    
    if(isInvalid) {
      return Alert.alert(isInvalid)
    }
    try {
      if(product.id) {
        await updateProduct(product)
      } else {
        await createProduct(product)
      }

      let products = await getProducts()
      setProducts(products)
      navigation.navigate('List')
    } catch (error) {
      
    }
  }

  return (
    <View style={{ height: '100%' }}>
      <List.Section>
        <List.Subheader>Cadastrar Produto</List.Subheader>
        <TextInput
          label="Nome"
          value={name}
          onChangeText={(text) => { setName(text) }}
        />
        <TextInput
          style={styles.marginTop10}
          label="Descrição"
          value={description}
          onChangeText={(text) => { setDescription(text) }}
        />
        <TextInput
          style={styles.marginTop10}
          label="Preço (R$)"
          value={price}
          keyboardType="numeric"
          onChangeText={(text) => { setPrice(text) }}
        />
        <View style={styles.marginTop10}>
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
        </View>
        <Button icon={product.id ? "pencil" : "plus"} mode="contained" onPress={() => saveProduct()} style={styles.marginTop10}>
        {product.id ? "Salvar" : "Cadastro" }
        </Button>
      </List.Section>
      <FAB
        style={styles.fab}
        icon="format-list-bulleted"
        onPress={() => navigation.navigate('List')}
      />
    </View>
  );
};

export default CreateProductsPage;