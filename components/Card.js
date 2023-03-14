import React from 'react';
import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';

const Card = ({product,navigation}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('ProductDetail',{productId:product.id})}>
    <View>
      <View style={styles.imgContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: product.image,
          }}
        />
      </View>
      <View style={styles.border} />
      <View style={styles.itemDescription}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>Rs. {product.price}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 5,
    height: 180,
    margin: 10,
    flex: 1,
  },
  imgContainer: {
    alignItems: 'center',
  },
  tinyLogo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  itemDescription: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    marginBottom: 1,
    borderBottomColor: '#A9A9A9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  productTitle: {
    marginBottom: 4,
    color: '#8c6fa8',
    fontWeight: '700',
  },
  productPrice: {
    color: '#8c6fa8',
    fontWeight: '700',
  },
});
export default Card;
