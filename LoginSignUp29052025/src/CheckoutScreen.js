import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from './Constants';
import Button from './components/Button';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {cartItems, total} = route.params;

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Confirmed',
      `Your order of $${total} has been placed successfully!`,
      [{text: 'OK', onPress: () => navigation.navigate('HomeStack')}],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={address.fullName}
            onChangeText={text => setAddress({...address, fullName: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={address.street}
            onChangeText={text => setAddress({...address, street: text})}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, {flex: 1, marginRight: 10}]}
              placeholder="City"
              value={address.city}
              onChangeText={text => setAddress({...address, city: text})}
            />
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="State"
              value={address.state}
              onChangeText={text => setAddress({...address, state: text})}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, {flex: 1, marginRight: 10}]}
              placeholder="ZIP Code"
              value={address.zipCode}
              onChangeText={text => setAddress({...address, zipCode: text})}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Country"
              value={address.country}
              onChangeText={text => setAddress({...address, country: text})}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('credit')}>
            <Ionicons
              name={
                paymentMethod === 'credit'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={24}
              color={colors.orange}
            />
            <Text style={styles.paymentText}>Credit/Debit Card</Text>
          </TouchableOpacity>

          {paymentMethod === 'credit' && (
            <View style={styles.cardDetails}>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardDetails.number}
                onChangeText={text =>
                  setCardDetails({...cardDetails, number: text})
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Name on Card"
                value={cardDetails.name}
                onChangeText={text =>
                  setCardDetails({...cardDetails, name: text})
                }
              />

              <View style={styles.row}>
                <TextInput
                  style={[styles.input, {flex: 1, marginRight: 10}]}
                  placeholder="Expiry (MM/YY)"
                  value={cardDetails.expiry}
                  onChangeText={text =>
                    setCardDetails({...cardDetails, expiry: text})
                  }
                />
                <TextInput
                  style={[styles.input, {flex: 1}]}
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChangeText={text =>
                    setCardDetails({...cardDetails, cvv: text})
                  }
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('paypal')}>
            <Ionicons
              name={
                paymentMethod === 'paypal'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={24}
              color={colors.orange}
            />
            <Text style={styles.paymentText}>PayPal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('cod')}>
            <Ionicons
              name={
                paymentMethod === 'cod' ? 'radio-button-on' : 'radio-button-off'
              }
              size={24}
              color={colors.orange}
            />
            <Text style={styles.paymentText}>Cash On Delivery</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          {cartItems.map(item => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.summaryText}>
                {item.title} x {item.quantity}
              </Text>
              <Text style={styles.summaryPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>${total}</Text>
          </View>
        </View>
      </ScrollView>

    <Button
  title="Place Order"
  color="orange"
  size="large"
  onPress={handlePlaceOrder}
  width="full"
/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
  },
  cardDetails: {
    marginLeft: 34,
    marginTop: 10,
  },
  summary: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#555',
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
  },
  placeOrderButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.orange,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
