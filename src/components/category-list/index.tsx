import * as React from 'react';
import { useContext } from 'react';
import { View } from 'react-native';
import { IconButton, List, Text } from 'react-native-paper';
import { Category } from '../../classes/category';
import { deleteCategory, getCategories } from '../../repository/category-repository';
import AppContext from '../../services/app-context';
import styles from './styles';

const CategoryList = ({ category, navigation }: { category: Category, navigation?: any }) => {
  const { setCategories, setCategoryEdit } = useContext(AppContext);

  async function funcDeleteCategory() {
    await deleteCategory(category.id || 0)
    let categories = await getCategories()

    setCategories(categories)
  }

  async function funcEditCategory() {
    setCategoryEdit(category)
    navigation.navigate('Create')
  }

  return (
    <View>
      <List.Item

        title={() => (
          <Text style={category.is_deleted ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#bdc3c7' }: {}}>
            {category.description}
          </Text>
        )}
        left={props => <List.Icon {...props} icon="format-list-bulleted" />}
        right={_ => (
          <View style={styles.buttonView}>
            <IconButton
              icon="pencil"
              size={20}
              disabled={category.is_deleted}
              onPress={() => funcEditCategory()}
            />
            <IconButton
              icon="delete"
              color='#e74c3c'
              disabled={category.is_deleted}
              size={20}
              onPress={() => funcDeleteCategory()}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CategoryList;