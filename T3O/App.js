import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , LogBox} from 'react-native';


//Screens
import Header from './Shared/Header'
import ProductContainer from './Screens/Products/ProductContainer'

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ProductContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});