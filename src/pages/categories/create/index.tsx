import * as React from 'react';
import { View } from 'react-native';
import { Button, FAB, List, TextInput } from 'react-native-paper';
import styles from './styles';

const CreateProductsPage = ({ navigation }: any) => {
  return (
    <View style={{height: '100%'}}>
      <List.Section>
        <List.Subheader>Cadastrar Categorias</List.Subheader>
        <TextInput
          label="Descrição"
          value={"aaaa"}
        />
        <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
          Cadastrar
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