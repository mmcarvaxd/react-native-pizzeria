import { useContext } from 'react';
import { View } from 'react-native';
import { FAB, List } from 'react-native-paper';
import { Category } from '../../../classes/category';
import CategoryList from '../../../components/category-list';
import AppContext from '../../../services/app-context';
import styles from './styles';

const ListCategoriesPage = ({ navigation }: any) => {
  //states
  const { categories, setCategoryEdit } = useContext(AppContext);
  
  return (
    <View style={{ height: '100%' }}>
      {categories.length ? categories.map((c: Category, i: number) => (
        <CategoryList key={i} category={c} navigation={navigation} />
      )) : (<List.Subheader>Nenhuma Categoria Cadastrada</List.Subheader>)}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {setCategoryEdit(null); navigation.navigate('Create')}}
      />
    </View>
  );
};

export default ListCategoriesPage;