import { StyleSheet,SafeAreaView,Text } from "react-native"
import ProductListingScreens from "./screens/ProductListingScreens";

export default function App() {
 return( <SafeAreaView style={styles.container}>
  <ProductListingScreens/>
 </SafeAreaView>
 );
}

const styles=StyleSheet.create({
  container:{
    // flex:1,
    // backgroundColor:"#fff",
    // alignItems:"center",
    // justifyContent:"center"
  }
})
