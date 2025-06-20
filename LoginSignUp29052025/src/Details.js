import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Details = ({route}) => {
  const {product} = route.params || {};
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{uri: product?.image}}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product?.title}</Text>
          <Text style={styles.productPrice}>${product?.price}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.productDescription}>
            {product?.description || 'No description available'}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() =>
                navigation.navigate('CartStack', {
                  screen: 'Checkout',
                  params: {
                    cartItems: [{...product, quantity: 1}],
                    total: product.price.toFixed(2),
                  },
                })
              }>
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() =>
                navigation.navigate('CartStack', {
                  screen: 'Cart',
                  params: {product},
                })
              }>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2a59fe',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  buyButton: {
    backgroundColor: '#2a59fe',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#ff9f00',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Details;
