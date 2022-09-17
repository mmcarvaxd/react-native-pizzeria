import * as React from 'react';
import { Image, View } from 'react-native';
import { Button, Card, Paragraph, Text, List, Divider, FAB } from 'react-native-paper';
import ProductCard from '../../../components/product-card';
import styles from './styles';

const ListProductsPage = ({ navigation }: any) => {
  return (
    <View style={{height: '100%'}}>
      <List.Section>
        <List.Subheader>Pizzas</List.Subheader>
      </List.Section>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
};

export default ListProductsPage;