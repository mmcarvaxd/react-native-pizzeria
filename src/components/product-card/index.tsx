import * as React from 'react';
import { View } from 'react-native';
import { Button, Card, Text, Divider } from 'react-native-paper';
import styles from './styles';

const ProductCard = () => {
  return (
    <View>
      <Card>
        <Card.Title title="Pizza de Calabresa" right={() => (<Button labelStyle={{ color: '#ee5253' }} onPress={() => console.log('Pressed')}>Remover</Button>)} />
        <Card.Content>
          <Text>Muzzarela, calabresa e cebola</Text>
          <Divider style={styles.divider}></Divider>
          <Text>Preço: R$ 50.00</Text>
        </Card.Content>
        <Card.Actions style={styles.buttonContainer}>
          <View></View>
          <Button icon="cart" mode="contained" labelStyle={{ color: 'white' }} onPress={() => console.log('Pressed')}>
            Comprar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ProductCard;