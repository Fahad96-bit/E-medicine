import React, {useEffect, useState} from 'react';
import productData from '../mock/products.json';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Card from '../components/Card';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(productData.products);
  }, []);

  return (
    <LinearGradient
      colors={['#f7f3fb', '#e8ddf2']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.home}>
        <View style={styles.productHeader}>
          <Entypo style={styles.icon} name="menu" />
          <Text style={styles.productText}>Products</Text>
          <EvilIcons style={styles.icon} name="cart" />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            key={'#'}
            numColumns={2}
            data={products}
            renderItem={itemData => {
              return <Card product={itemData.item} />;
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  listContainer: {
    padding: 25,
    height: '100%',
    flex: 5,
  },
  productHeader: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  productText: {
    fontSize: 20,
    color: '#8c6fa8',
    fontWeight: '700',
  },
  icon: {
    fontSize: 27,
    color: '#8c6fa8',
    fontWeight: '700',
  },
});
export default Home;
