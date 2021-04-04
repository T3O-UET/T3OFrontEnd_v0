import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { Root } from 'native-base'

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
//Navigators
import Main from './Navigators/Main';

//Screens
import Header from './Shared/Header';
// import ProductContainer from './Screens/Products/ProductContainer';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Root>
    <Provider store={store}>
      <NavigationContainer>
      {/* <View style={styles.container}> */}
      <Header />
      <Main />
    {/* </View> */}
    </NavigationContainer>
    </Provider>
    </Root>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });