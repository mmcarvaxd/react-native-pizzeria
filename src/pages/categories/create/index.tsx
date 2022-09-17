import { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, FAB, List, TextInput } from 'react-native-paper';
import { Category } from '../../../classes/category';
import { createCategory, getCategories, updateCategory } from '../../../repository/category-repository';
import AppContext from '../../../services/app-context';
import { validateCategory } from '../../../services/category-service';
import styles from './styles';

const CreateProductsPage = ({ navigation }: any) => {
  //States
  const { setCategories, categoryEdit } = useContext(AppContext);
  const [description, setDescription] = useState<string>(categoryEdit?.description || '')
  let category: Category = {
    description,
    is_deleted: false
  }

  if (categoryEdit) {
    category = categoryEdit
  }
  //functions
  async function saveDescription() {
    category.description = description

    try {
      let isNotValid = validateCategory(category)
      if (isNotValid) {
        return Alert.alert(isNotValid)
      }

      try {
        if (category.id) {
          await updateCategory(category)
        } else {
          await createCategory(category)
        }

        let categories = await getCategories()

        setCategories(categories)
        navigation.navigate('List')
      } catch (err) {
        console.log(err)
        return Alert.alert("Ocorreu um erro")
      }
    } catch (error: any) {
      Alert.alert(error)
    }
  }

  return (
    <View style={{ height: '100%' }}>
      <List.Section>
        <List.Subheader>Cadastrar Categorias</List.Subheader>
        <TextInput
          label="Descrição"
          value={description}
          onChangeText={(value: string) => { setDescription(value) }}
        />
        <Button style={styles.marginTop10} icon={category.id ? "pencil" : "plus"} mode="contained" onPress={async () => await saveDescription()}>
          {category.id ? "Editar" : "Cadastrar"}
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