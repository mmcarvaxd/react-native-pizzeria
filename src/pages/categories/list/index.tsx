import * as React from 'react';
import { View } from 'react-native';
import { List, FAB } from 'react-native-paper';
import styles from './styles';

const ListCategoriesPage = ({ navigation }: any) => {
  return (
    <View style={{ height: '100%' }}>
      <List.Item
        title="Pizzas"
        left={props => <List.Icon {...props} icon="format-list-bulleted" />}
      />
      <List.Item
        title="Refrigerante"
        left={props => <List.Icon {...props} icon="format-list-bulleted" />}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
};

export default ListCategoriesPage;