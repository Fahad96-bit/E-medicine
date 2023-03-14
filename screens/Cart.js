import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import SmallCard from '../components/SmallCard';

const Cart = ({navigation}) => {
  const [product, setProduct] = useState('');
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Cart',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#8c6fa8',
      headerShadowVisible: false,
      headerLeft: () => (
        <AntDesign
          style={styles.icon}
          name="left"
          onPress={() => navigation.navigate('Home')}
        />
      ),
    });
  }, [navigation]);
  const {addedItems: cartItems, total} = useSelector(
    state => state.cartReducer,
  );
  return (
    <LinearGradient
      colors={['#f7f3fb', '#e8ddf2']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={cartItems}
            renderItem={itemData => {
              return <SmallCard product={itemData.item} />;
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
        <View>
          <View style={styles.border} />
          <View style={styles.totalAmount}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>Rs.{total}</Text>
          </View>
          <View style={styles.border} />

          <TouchableOpacity
            style={styles.buyNowBtn}
            onPress={() => Alert.alert('Order Completed')}>
            <Text style={styles.buyNowBtnText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 25,
    color: '#8c6fa8',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    padding: 32,
  },
  listContainer: {
    height: '100%',
    flex: 1,
  },
  border: {
    marginVertical: 8,
    marginBottom: 1,
    borderBottomColor: '#A9A9A9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buyNowBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#8c6fa8',
    height: 55,
    marginTop: 40,
  },
  buyNowBtnText: {
    color: 'white',
  },
  totalAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  total: {
    color: 'black',
    fontSize: 17,
    fontWeight: '250',
  },
});
export default Cart;
