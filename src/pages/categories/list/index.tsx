import { useContext } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FAB, List } from 'react-native-paper';
import { Category } from '../../../classes/category';
import CategoryList from '../../../components/category-list';
import AppContext from '../../../services/app-context';
import styles from './styles';

const ListCategoriesPage = ({ navigation }: any) => {
  //states
  const { categories, setCategoryEdit } = useContext(AppContext);
  let categoriesNotExcluded = categories.filter((c: Category) => !c.is_deleted)

  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
        {categoriesNotExcluded.length ? categoriesNotExcluded.map((c: Category, i: number) => (
          <CategoryList key={i} category={c} navigation={navigation} />
        )) : (<List.Subheader>Nenhuma Categoria Cadastrada</List.Subheader>)}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => { setCategoryEdit(null); navigation.navigate('Create') }}
      />
    </View>
  );
};

export default ListCategoriesPage;