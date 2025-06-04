import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import {useNavigation} from '@react-navigation/native';

const Home = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAPIData = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/posts/';
      console.log('Fetching data from:', url);
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      console.log('Data fetched successfully:', result);
      setData(result);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const {route} = props;
  const email = route?.params?.email || '';
  const navigation = useNavigation();

  return (
    <Background>
      <ScrollView style={{paddingHorizontal: 20}}>
        <Text style={styles.welcomeText}>Welcome {email}</Text>

        <View style={styles.buttonsContainer}>
          <Btn
            bgColor={darkGreen}
            textColor="white"
            btnLabel="Login"
            Press={() => navigation.navigate('Login')}
          />
          <Btn
            bgColor="white"
            textColor={darkGreen}
            btnLabel="SignUp"
            Press={() => navigation.navigate('SignUp')}
          />
        </View>

        <Text style={styles.sectionTitle}>Latest Posts</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={styles.loader}
          />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.postItem}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postBody}>{item.body}</Text>
              </View>
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    color: 'white',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginBottom: 25,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  postItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  postBody: {
    fontSize: 14,
    color: '#ddd',
  },
});

export default Home;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   ActivityIndicator,
//   FlatList,
//   ScrollView,
//   TouchableOpacity
// } from 'react-native';
// import Background from './Background';
// import Btn from './Btn';
// import {darkGreen} from './Constants';
// import {useNavigation} from '@react-navigation/native';

// const Home = props => {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// //         const data = await response.json();
// //         setPosts(data.slice(0, 10));
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// const [data,setData]=useState(undefined);

// const getAPIData=async()=>{
//   const url="https://jsonplaceholder.typicode.com/posts/1";
//   let result = await fetch(url);
//   result=await result.json();
//   setData(result)
// }

// useEffect(()=>{
// getAPIData();
// },[])

//   const {route} = props;
//   const email = route?.params?.email || '';
//   const navigation = useNavigation();

//   // const renderPostItem = ({item}) => (
//   //   <TouchableOpacity
//   //     style={styles.postItem}

//   //   >
//   //     <Text style={styles.postTitle}>{item.title}</Text>
//   //     <Text style={styles.postBody} numberOfLines={2}>{item.body}</Text>
//   //   </TouchableOpacity>
//   // );

//   return (
//     <Background>
//       <ScrollView style={{paddingHorizontal: 20}}>
//         <Text style={styles.welcomeText}>
//           Welcome {email}
//         </Text>
//         <View>
//           <Text style={{fontSize:30}}>API CALL</Text>
//           {
//             data?<View>
//                <Text style={{fontSize:30}}>{data.id}</Text>
//                   <Text style={{fontSize:30}}>{data.userId}</Text>
//                     <Text style={{fontSize:30}}>{data.title}</Text>
//             </View>:null
//           }
//         </View>
//         <View style={styles.buttonsContainer}>
//           <Btn
//             bgColor={darkGreen}
//             textColor="white"
//             btnLabel="Login"
//             Press={() => navigation.navigate('Login')}
//           />
//           <Btn
//             bgColor="white"
//             textColor={darkGreen}
//             btnLabel="SignUp"
//             Press={() => navigation.navigate('SignUp')}
//           />
//         </View>

//         <Text style={styles.sectionTitle}>Latest Posts</Text>

//         {/* {loading ? (
//           <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
//         ) : error ? (
//           <Text style={styles.errorText}>Error: {error}</Text>
//         ) : (
//           <FlatList
//             data={posts}
//             renderItem={renderPostItem}
// keyExtractor={item => item.id.toString()}
//             scrollEnabled={false}
//             contentContainerStyle={styles.listContainer}
//           />
//         )} */}
//       </ScrollView>
//     </Background>
//   );
// };

// const styles = StyleSheet.create({
//   welcomeText: {
//     color: 'white',
//     fontSize: 24,
//     marginTop: 20,
//     marginBottom: 15,
//     fontWeight: 'bold'
//   },
//   buttonsContainer: {
//     marginBottom: 25,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   postItem: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 10,
//   },
//   postTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: darkGreen,
//   },
//   postBody: {
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default Home;
