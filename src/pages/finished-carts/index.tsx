import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Paragraph, Title, Button, Divider } from 'react-native-paper';
import { Cart } from '../../classes/cart';
import Header from '../../components/header';
import AppContext from '../../services/app-context';
import styles from './styles';


const CartFinishedPage = () => {
  const { carts } = useContext(AppContext);

  let finished_carts = carts.filter((c: Cart) => c.is_finished)

  function calculateTotal(cart: Cart) {
    let total = 0
    cart.cart_products?.forEach(cp => {
      if(cp.product) {
        total += (cp.product.price * cp.quantity)
      }
    })

    return total.toFixed(2).toString()
  }

  return (
    <View style={{height: '100%'}}>
      <Header title="Meus Pedidos"></Header>
      <ScrollView>
        {finished_carts.map((c: Cart) => (
          <Card style={styles.marginBotton10}>
            <Card.Content>
              <Title>{`Pedido número - ${c.id}`}</Title>
              {c.cart_products?.map(cp => (
                <Paragraph>{`${cp.quantity}x - ${cp.product?.name}`}</Paragraph>
              ))}
              <Divider style={styles.margin5}></Divider>
              <Paragraph>{`Total: R$ ${calculateTotal(c)}`}</Paragraph>

            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default CartFinishedPage;