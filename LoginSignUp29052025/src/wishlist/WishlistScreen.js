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
  const wishlistItems = useSelector(state => state.wishlist);
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [quantities, setQuantities] = useState({});

  // Initialize quantities for all wishlist items only once or when wishlistItems change
  useEffect(() => {
    const initialQuantities = {};
    wishlistItems.forEach(item => {
      if (quantities[item.id] === undefined) {
        initialQuantities[item.id] = '1';
      }
    });
    if (Object.keys(initialQuantities).length > 0) {
      setQuantities(prev => ({...prev, ...initialQuantities}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlistItems]);

  const handleQuantityChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities(prev => ({...prev, [id]: value}));
    }
  };

  const renderItem = useCallback(
    ({item}) => {
      // Removed setQuantities from here to avoid setState in render
      return (
        <View style={styles.card}>
          <Image source={{uri: item.image}} style={styles.productImage} />
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.partNoLabel}>Part No. :</Text>
              <Text style={styles.partNo}>{item.id}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromWishlist(item.id))}
                style={styles.heartBtn}>
                <Ionicons name="heart" size={28} color={DARK_BLUE} />
              </TouchableOpacity>
            </View>
            <Text style={styles.desc} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Price :</Text>
              <Text style={styles.priceValue}>${item.price}</Text>
            </View>
            <View style={styles.quantityRow}>
              <Text style={styles.quantityLabel}>Quantity :</Text>
              <TextInput
                style={styles.quantityInput}
                value={
                  quantities[item.id] !== undefined ? quantities[item.id] : '1'
                }
                onChangeText={value => handleQuantityChange(item.id, value)}
                keyboardType="number-pad"
                maxLength={3}
                placeholder="1"
                placeholderTextColor={DARK_BLUE}
              />
            </View>
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => {
                const quantity = parseInt(quantities[item.id], 10) || 1;
                dispatch(addItem({...item, quantity}));
              }}>
              <Text style={styles.addToCartText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [dispatch, quantities],
  );

  

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
    color: '#2563a6', // medium blue between light and dark
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
});

export default WishlistScreen;
