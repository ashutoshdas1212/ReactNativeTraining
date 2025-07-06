// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   ActivityIndicator,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   RefreshControl,
// } from 'react-native';
// import Background from './Background';
// import Btn from './Btn';
// import {darkGreen} from './Constants';
// import {useNavigation} from '@react-navigation/native';
// import Button from './components/Button';

// const Home = props => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const {route} = props;
//   const email = route?.params?.email || '';
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const URL = 'https://fakestoreapi.com/products?limit=20';
//       let response = await fetch(URL);
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       let result = await response.json();
//       setProducts(result);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchProducts();
//   };

//   const handleProductPress = product => {
//     navigation.navigate('Details', {product});
//   };

//   const handleAddToCart = product => {
//     navigation.navigate('CartStack', {
//       screen: 'Cart',
//       params: {product},
//     });
//   };

//   const handleBuyNow = product => {
//     navigation.navigate('CartStack', {
//       screen: 'Checkout',
//       params: {
//         cartItems: [{...product, quantity: 1}],
//         total: product.price.toFixed(2),
//       },
//     });
//   };

//   if (loading && !refreshing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator color="red" size="large" />
//       </View>
//     );
//   }

//   return (
//     <Background>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.welcomeText}>Welcome {email}</Text>
//         </View>
//         {error ? (
//           <View style={styles.errorContainer}>
//             <Text style={styles.errorText}>Error: {error}</Text>
//             <TouchableOpacity
//               style={styles.retryButton}
//               onPress={fetchProducts}>
//               <Text style={styles.retryButtonText}>Retry</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <FlatList
//             data={products}
//             keyExtractor={item => item.id.toString()}
//             showsVerticalScrollIndicator={true}
//             numColumns={2}
//             contentContainerStyle={styles.listContent}
//             style={styles.productsList}
//             ListHeaderComponent={
//               <Text style={styles.sectionTitle}>Featured Products</Text>
//             }
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={['#FF9900']}
//                 tintColor="#FF9900"
//               />
//             }
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 style={styles.cardContainer}
//                 onPress={() => handleProductPress(item)}>
//                 <Image source={{uri: item.image}} style={styles.image} />
//                 <Text style={styles.title} numberOfLines={2}>
//                   {item.title}
//                 </Text>
//                 <Text style={styles.price}>${item.price}</Text>
//                 <Text style={styles.rating}>
//                   Rating: {item.rating.rate} ({item.rating.count})
//                 </Text>
//                 {/* <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     style={[styles.actionButton, {backgroundColor: darkGreen}]}
//                     onPress={() => handleBuyNow(item)}>
//                     <Text style={styles.buttonText}>Buy Now</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[styles.actionButton, {backgroundColor: '#FF9900'}]}
//                     onPress={() => handleAddToCart(item)}>
//                     <Text style={styles.buttonText}>Add to Cart</Text>
//                   </TouchableOpacity>
//                 </View> */}
//                 <View style={styles.buttonContainer}>
//                   <Button
//                     title="Buy Now"
//                     color="green"
//                     size="small"
//                     onPress={() => handleBuyNow(item)}
//                     style={{flex: 1, marginRight: 5}}
//                   />
//                   <Button
//                     title="Add to Cart"
//                     color="orange"
//                     size="small"
//                     onPress={() => handleAddToCart(item)}
//                     style={{flex: 1, marginLeft: 5}}
//                   />
//                 </View>
//               </TouchableOpacity>
//             )}
//             ListFooterComponent={
//               <View style={styles.footer}>
//                 <Text style={styles.footerText}>Showing products</Text>
//               </View>
//             }
//           />
//         )}
//       </View>
//     </Background>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   header: {
//     marginBottom: 20,
//     marginTop: 20,
//   },
//   welcomeText: {
//     color: 'white',
//     fontSize: 24,
//     marginBottom: 15,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   buttonsContainer: {
//     marginBottom: 25,
//   },
//   authButton: {
//     marginVertical: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   retryButton: {
//     backgroundColor: '#FF9900',
//     padding: 10,
//     borderRadius: 5,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   productsList: {
//     flex: 1,
//   },
//   listContent: {
//     paddingBottom: 30,
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     marginTop: 10,
//   },
//   cardContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     margin: 5,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 2,
//     maxWidth: '48%',
//   },
//   image: {
//     height: 120,
//     width: 120,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 14,
//     textAlign: 'center',
//     marginBottom: 5,
//     fontWeight: 'bold',
//     height: 40,
//   },
//   price: {
//     fontSize: 16,
//     color: '#B12704',
//     fontWeight: 'bold',
//     marginBottom: 3,
//   },
//   rating: {
//     fontSize: 12,
//     color: '#007185',
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   actionButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginHorizontal: 2,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   footer: {
//     padding: 15,
//     alignItems: 'center',
//   },
//   footerText: {
//     color: 'white',
//     fontSize: 14,
//   },
// });

// export default Home;

import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import {useNavigation} from '@react-navigation/native';

const Home = props => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const {route} = props;
  const email = route?.params?.email || '';
  const navigation = useNavigation();

  const fetchProducts = useCallback(async () => {
    try {
      const URL = 'https://fakestoreapi.com/products?limit=20';
      let response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      let result = await response.json();
      setProducts(result);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, [fetchProducts]);

  const handleProductPress = useCallback(
    product => {
      navigation.navigate('Details', {product});
    },
    [navigation],
  );

  const handleAddToCart = useCallback(
    product => {
      navigation.navigate('CartStack', {
        screen: 'Cart',
        params: {product},
      });
    },
    [navigation],
  );

  const handleBuyNow = useCallback(
    product => {
      navigation.navigate('CartStack', {
        screen: 'Checkout',
        params: {
          cartItems: [{...product, quantity: 1}],
          total: product.price.toFixed(2),
        },
      });
    },
    [navigation],
  );

  const memoizedProducts = useMemo(() => products, [products]);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleProductPress(item)}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.rating}>
          Rating: {item.rating.rate} ({item.rating.count})
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: darkGreen}]}
            onPress={() => handleBuyNow(item)}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: '#FF9900'}]}
            onPress={() => handleAddToCart(item)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ),
    [handleProductPress, handleBuyNow, handleAddToCart],
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome {email}</Text>
        </View>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchProducts}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={memoizedProducts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={true}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            style={styles.productsList}
            ListHeaderComponent={
              <Text style={styles.sectionTitle}>Featured Products</Text>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#FF9900']}
                tintColor="#FF9900"
              />
            }
            ListFooterComponent={
              <View style={styles.footer}>
                <Text style={styles.footerText}>Showing products</Text>
              </View>
            }
          />
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF9900',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productsList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '48%',
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
    height: 40,
  },
  price: {
    fontSize: 16,
    color: '#B12704',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  rating: {
    fontSize: 12,
    color: '#007185',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Home;
