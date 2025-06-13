// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { colors } from './Constants';

// const CartScreen = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const route = useRoute();
//   const navigation = useNavigation();

//   useEffect(() => {
//   if (route.params?.product) {
//     setCartItems(prevItems => [...prevItems, route.params.product]);
//   }
// }, [route.params?.product]);

//   const removeFromCart = (itemId) => {
//     setCartItems(cartItems.filter(item => item.id !== itemId));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
//   };

//   const handleCheckout = () => {
//     Alert.alert('Order Placed', 'Your order has been placed successfully!');
//     setCartItems([]);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.cartItem}>
//       <Image source={{ uri: item.image }} style={styles.itemImage} />
//       <View style={styles.itemDetails}>
//         <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
//         <Text style={styles.itemPrice}>${item.price}</Text>
//         <TouchableOpacity
//           style={styles.removeButton}
//           onPress={() => removeFromCart(item.id)}
//         >
//           <Ionicons name="trash-outline" size={20} color="red" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Cart</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {cartItems.length === 0 ? (
//         <View style={styles.emptyCart}>
//           <Ionicons name="cart-outline" size={60} color="#ccc" />
//           <Text style={styles.emptyText}>Your cart is empty</Text>
//           <TouchableOpacity
//             style={styles.shopButton}
//             onPress={() => navigation.navigate('HomeStack')}
//           >
//             <Text style={styles.shopButtonText}>Shop Now</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <FlatList
//             data={cartItems}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             contentContainerStyle={styles.listContent}
//           />
//           <View style={styles.totalContainer}>
//             <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
//             <TouchableOpacity
//               style={styles.checkoutButton}
//               onPress={handleCheckout}
//             >
//               <Text style={styles.checkoutButtonText}>Checkout</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   emptyCart: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     marginTop: 10,
//   },
//   shopButton: {
//     marginTop: 20,
//     backgroundColor: colors.orange,
//     padding: 15,
//     borderRadius: 8,
//     width: '60%',
//     alignItems: 'center',
//   },
//   shopButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     resizeMode: 'contain',
//   },
//   itemDetails: {
//     flex: 1,
//     marginLeft: 15,
//     justifyContent: 'center',
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: '#B12704',
//     fontWeight: 'bold',
//   },
//   removeButton: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//   },
//   listContent: {
//     paddingBottom: 100,
//   },
//   totalContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   checkoutButton: {
//     backgroundColor: colors.orange,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   checkoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CartScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './Constants';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const route = useRoute();

  useEffect(() => {
    if (route.params?.product) {
      const existingItem = cartItems.find(item => item.id === route.params.product.id);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.id === route.params.product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        ));
      } else {
        setCartItems([...cartItems, {...route.params.product, quantity: 1}]);
      }
    }
  }, [route.params?.product]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? {...item, quantity: newQuantity} : item
    ));
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

const handleCheckout = () => {
  navigation.navigate('Checkout', {
    cartItems: cartItems,
    total: calculateTotal()
  });
};

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
       
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={20} color="black" />
          </TouchableOpacity>
         
          <Text style={styles.quantityText}>{item.quantity}</Text>
         
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>
       
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('HomeStack')}
          >
            <Text style={styles.shopButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  shopButton: {
    marginTop: 20,
    backgroundColor: colors.orange,
    padding: 15,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#B12704',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  listContent: {
    paddingBottom: 100,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: colors.orange,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;