import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const ProductListingScreens = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const URL = 'https://fakestoreapi.com/products';
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorStyle}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.rating}>Rating: {item.rating.rate} ({item.rating.count})</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '50%',
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
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
  },
});

export default ProductListingScreens;