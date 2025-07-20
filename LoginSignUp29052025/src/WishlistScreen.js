

// import React, {useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {colors} from './Constants';
// import {removeFromWishlist} from './redux/wishlistSlice';

// const WishlistScreen = ({navigation}) => {
//   const wishlistItems = useSelector(state => state.wishlist);
//   const dispatch = useDispatch();

//   const renderItem = useCallback(
//     ({item}) => (
//       <View style={styles.wishlistItem}>
//         <Image source={{uri: item.image}} style={styles.itemImage} />
//         <View style={styles.itemDetails}>
//           <Text style={styles.itemTitle} numberOfLines={2}>
//             {item.title}
//           </Text>
//           <Text style={styles.itemPrice}>${item.price}</Text>
//           <View style={styles.actionsContainer}>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => navigation.navigate('Details', {product: item})}>
//               <Text style={styles.actionText}>View Details</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => dispatch(removeFromWishlist(item.id))}>
//               <Ionicons name="trash-outline" size={24} color="red" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     ),
//     [dispatch, navigation],
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Wishlist</Text>
//         <View style={{width: 24}} />
//       </View>

//       {wishlistItems.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Ionicons name="heart-outline" size={60} color="#ccc" />
//           <Text style={styles.emptyText}>Your wishlist is empty</Text>
//           <TouchableOpacity
//             style={styles.shopButton}
//             onPress={() => navigation.navigate('Home')}>
//             <Text style={styles.shopButtonText}>Browse Products</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <FlatList
//           data={wishlistItems}
//           renderItem={renderItem}
//           keyExtractor={item => item.id.toString()}
//           contentContainerStyle={styles.listContent}
//         />
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
//   emptyContainer: {
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
//   wishlistItem: {
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
//     marginBottom: 10,
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   actionButton: {
//     backgroundColor: colors.darkGreen,
//     padding: 8,
//     borderRadius: 5,
//   },
//   actionText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
// });

// export default WishlistScreen;




import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from './Constants';
import {removeFromWishlist} from './redux/wishlistSlice';

const WishlistScreen = ({navigation}) => {
  const wishlistItems = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.wishlistItem}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate('HomeStack', {
                  screen: 'Details',
                  params: {product: item}
                })
              }>
              <Text style={styles.actionText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(removeFromWishlist(item.id))}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [dispatch, navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Wishlist</Text>
        <View style={{width: 24}} />
      </View>

      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() =>
              navigation.navigate('HomeStack', {screen: 'Home'})
            }>
            <Text style={styles.shopButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
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
  emptyContainer: {
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
  wishlistItem: {
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: colors.darkGreen,
    padding: 8,
    borderRadius: 5,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default WishlistScreen;