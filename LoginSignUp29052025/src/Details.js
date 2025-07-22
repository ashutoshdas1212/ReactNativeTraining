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
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from './cart/cartSlice';
import {addToWishlist, removeFromWishlist} from './wishlist/wishlistSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Details = ({route}) => {
  const {product} = route.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist);

  const isInWishlist = wishlistItems.some(item => item.id === product?.id);
  const handleWishlistPress = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageHeader}>
          <Image
            source={{uri: product?.image}}
            style={styles.productImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={handleWishlistPress}
            style={styles.wishlistButton}>
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={30}
              color={isInWishlist ? 'red' : 'white'}
            />
          </TouchableOpacity>
        </View>
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
              onPress={() => {
                navigation.navigate('Main Screen', {
                  screen: 'CartStack',
                  params: {
                    screen: 'Checkout',
                    params: {
                      cartItems: [{...product, quantity: 1}],
                      total: product.price.toFixed(2),
                    },
                  },
                });
              }}>
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => dispatch(addItem(product))}>
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
  imageHeader: {
    position: 'relative',
  },
  wishlistButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(105, 94, 94, 0.3)',
    borderRadius: 25,
    padding: 8,
  },
});

export default Details;
