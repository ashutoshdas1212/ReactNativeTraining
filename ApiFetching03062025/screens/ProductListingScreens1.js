

import {StyleSheet, Text, View,FlatList,Image,ActivityIndicator} from 'react-native';
import React, {useEffect,useState} from 'react';

const ProductListingScreens = () => {
  const [products, setProducts] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const URL = 'https://fakestoreapi.com/products';
    fetch(URL)
      .then(res => {
        if(!res.ok)
        {
          throw new Error("Something went wrong")
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
        console.log(data);
      }).catch((error)=>{
        setError(error.message);
      console.log(error.message);
      
      })
  };

  return (
    <View>
      {
        isLoading?(<ActivityIndicator color="red" size="large"/>
        ):error?<Text style={styles.error}>{error}</Text>:(
    
      <FlatList
      showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Image source={{uri:item.image }} style={styles.image}/>
            <Text style={{fontSize:18, textAlign:"center"}}>{item.price}</Text>
          </View>
        )}
      />
      )} 
    </View>
      
  );
};

export default ProductListingScreens;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  image: {
    height: 200,
    width: 200,
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
  },
});
