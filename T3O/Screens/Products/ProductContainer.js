import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, SafeAreaView, TouchableHighlight } from 'react-native';
import { Container, Header, Icon, Item, Input, Text, Image, AnimatedView} from 'native-base';
import { SearchBar } from 'react-native-elements';


import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
import Banner from '../../Shared/Banner'

const data = require('../../assets/data/products.json');

const ProductContainer = () => {

  const [products, setProducts ] = useState([]);
  const [productsFiltered, setproductsFiltered] = useState([]);
  const [focus, setFocus] = useState();


  useEffect(() => {
    setProducts(data);
    setproductsFiltered(data);
    setFocus(false);

    return () => {
      setProducts([])
      setproductsFiltered([])
      setFocus()
    }
  }, [])
  const searchProduct = (text) => {
    setproductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const openList = () => {
    setFocus(true);
  }

  const onBlur = () => {
    setFocus(false);
  }
  const _onFocus = () => {

  }
  return (
    <ScrollView>
    <View>
      {/* <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <Image
                style={styles.image}
                source={require("../../assets/logo.png")}
                resizeMode="contain"
            />
            <Text style={styles.title}>
                T3O Store
            </Text>
          </View>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={"#ccd0d5"}
            onPress={this._onFocus}
            style={styles.search_icon_box}
          >
            <Icon name="search" size={22} color="#000000"  />
          </TouchableHighlight>
          <AnimatedView
            style={[ styles.input_box, {transform: [{translateX: this._input_box_translate_x}] }]}
          ></AnimatedView>
        </View>
      </SafeAreaView> */}
      {/* older code */}
      {/* <Header searchBar rounded>
        <Item>
          <Icon name="ios-search"/> */}
          <SearchBar
            searchIcon={{ size: 30 }}
            showLoading={false}
            platform={Platform.OS}
            // clearIcon={true}
            // value={search}
            inputStyle={{backgroundColor: '#EEEEEE'}}
            containerStyle={{backgroundColor: 'white'}}
            // placeholderTextColor={'#g5g5g5'}
            round
            searchIcon={{ size: 20 }}
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? (
            <Icon onPress={onBlur} name="ios-close" />
          ) : null}
        {/* </Item>
      </Header> */}
      {focus == true ? (
        <SearchProduct
          productsFiltered={productsFiltered} 
          />
      ) : (
          <View >
            <View>
              <Banner />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={products}
                numColumns={2}
                renderItem={({item}) => <ProductList
                key={item.brand}
                item={item}/>}
                keyExtractor={item => item.brand}
              />
            </View>
          </View>
      )}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro'
  },
  // header_safe_area: {
  //   zIndex: 1000
  // },
  // header: {
  //   height: 50,
  //   paddingHorizontal: 16
  // },
  // header_inner: {
  //   flex: 1,
  //   overflow: 'hidden',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   position: 'relative'
  // },
  // image: {
  //   height: 35,
  //   width: 50,
  // },
  // title: {
  //   fontWeight: "bold",
  //   fontSize: 22,
  // },
  // search_icon_box: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 40,
  //   backgroundColor: '#e4e6eb',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // }
})
export default ProductContainer;