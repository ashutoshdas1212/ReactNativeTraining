import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Constants';
import {removeFromWishlist} from './wishlistSlice';
import {addItem} from '../cart/cartSlice';
import {useNavigation} from '@react-navigation/native';
import {fontFamily} from '../../constants/fontFamily';
import {fontSize} from '../../constants/dimensions';

const {width} = Dimensions.get('window');
const DARK_BLUE = '#003580';
const GRAY = '#888888';
const CARD_BORDER = '#E5E5E5';
const BG = '#F5F6FA';
const PRICE_DARK = '#003580';
const ICON_GRAY = '#B0B0B0';

const WishlistScreen = () => {
  // Redux and navigation hooks
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Local state for wishlist, loading, error, and quantities
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  // Get JWT token from Redux
  const token = useSelector(state => state.auth.token);

  // Fetch wishlist from backend when token is available
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetch('https://adminbackend.azurewebsites.net/mobile/1.1.1/wishlist', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status && Array.isArray(data.data)) {
          setWishlist(data.data);
        } else {
          setError(data.message || 'Failed to fetch wishlist');
        }
      })
      .catch(err => setError(err.message || 'Network error'))
      .finally(() => setLoading(false));
  }, [token]);

  // Reset quantities when wishlist changes
  useEffect(() => {
    const initialQuantities = {};
    wishlist.forEach(item => {
      if (quantities[item.wishlistId] === undefined) {
        initialQuantities[item.wishlistId] = '1';
      }
    });
    if (Object.keys(initialQuantities).length > 0) {
      setQuantities(prev => ({...prev, ...initialQuantities}));
    }
  }, [wishlist, quantities]);

  // Handle quantity input change
  const handleQuantityChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities(prev => ({...prev, [id]: value}));
    }
  };

  // Render a single spare part card
  const renderSparePart = useCallback(
    ({item, wishlistId}) => (
      <View style={styles.card} key={item.BSUSNumber}>
        <Image source={{uri: item.spImageUrl}} style={styles.productImage} />
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.partNoLabel}>Part No. :</Text>
            <Text style={styles.partNo}>{item.partNumber}</Text>
          </View>
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price :</Text>
            <Text style={styles.priceValue}>${item.salesPrice}</Text>
          </View>
          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity :</Text>
            <TextInput
              style={styles.quantityInput}
              value={
                quantities[wishlistId] !== undefined
                  ? quantities[wishlistId]
                  : '1'
              }
              onChangeText={value => handleQuantityChange(wishlistId, value)}
              keyboardType="number-pad"
              maxLength={3}
              placeholder="1"
              placeholderTextColor={DARK_BLUE}
            />
          </View>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => {
              const quantity = parseInt(quantities[wishlistId], 10) || 1;
              dispatch(addItem({...item, quantity}));
            }}>
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [dispatch, quantities],
  );

  // Render a wishlist section with its spare parts
  const renderWishlist = useCallback(
    ({item}) => (
      <View key={item.wishlistId} style={{marginBottom: 24}}>
        <Text style={styles.wishlistHeader}>{item.wishlistName}</Text>
        {item.spareParts && item.spareParts.length > 0 ? (
          item.spareParts.map(sparePart => (
            <View key={sparePart.BSUSNumber} style={styles.sparePartWrapper}>
              {renderSparePart({item: sparePart, wishlistId: item.wishlistId})}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No spare parts in this wishlist.</Text>
        )}
        <View style={styles.divider} />
      </View>
    ),
    [renderSparePart],
  );

  // Show loading or error states
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{textAlign: 'center', marginTop: 40}}>
          Loading wishlist...
        </Text>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{color: 'red', textAlign: 'center', marginTop: 40}}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  // Main render: wishlist list
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={wishlist}
        renderItem={renderWishlist}
        keyExtractor={item => item.wishlistId.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 16,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 14,
    marginTop: 2,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  partNoLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: DARK_BLUE,
    marginRight: 2,
    letterSpacing: 0.2,
  },
  partNo: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: GRAY,
    marginRight: 8,
    letterSpacing: 0.2,
  },
  heartBtn: {
    marginLeft: 'auto',
    marginTop: -8,
    marginRight: -8,
    padding: 6,
  },
  desc: {
    fontFamily: fontFamily.regular,
    fontSize: 13.5,
    color: DARK_BLUE,
    marginBottom: 4,
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: 0.1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 0,
  },
  priceLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: DARK_BLUE,
    marginRight: 4,
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
  priceValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: DARK_BLUE,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 6,
  },
  quantityLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: '#2563a6',
    marginRight: 8,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  quantityInput: {
    width: 48,
    height: 32,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    borderRadius: 7,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: DARK_BLUE,
    fontWeight: 'bold',
    marginLeft: 0,
    padding: 0,
  },
  addToCartBtn: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: DARK_BLUE,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  addToCartText: {
    fontFamily: fontFamily.medium,
    color: DARK_BLUE,
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0.1,
  },
  listContent: {
    paddingBottom: 130,
  },
  bottomNavWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  bottomNavConcave: {
    width: width,
    height: 82,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  concaveCutout: {
    position: 'absolute',
    left: width / 2 - 36,
    top: -18,
    width: 72,
    height: 36,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    zIndex: 2,
  },
  bottomNavContent: {
    flexDirection: 'row',
    width: width,
    height: 82,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 38,
    zIndex: 1,
  },
  navBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13.5,
    color: DARK_BLUE,
    marginTop: 2,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  qrBtn: {
    position: 'absolute',
    left: width / 2 - 32,
    top: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: DARK_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: 18,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    zIndex: 3,
  },
  cartBadgeText: {
    fontFamily: fontFamily.bold,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // --- New styles for better organization ---
  wishlistHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    color: DARK_BLUE,
    marginBottom: 8,
  },
  sparePartWrapper: {
    marginBottom: 12,
  },
  emptyText: {
    marginLeft: 16,
    color: GRAY,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
    marginTop: 16,
  },
});

export default WishlistScreen;
