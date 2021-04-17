import React, { useState, useEffect,  useCallback } from 'react';
import { 
        Alert,
        ScrollView, 
        View, 
        StyleSheet, 
        ActivityIndicator, 
        FlatList, 
        TouchableOpacity, 
        SafeAreaView, 
        TouchableHighlight,
        Dimensions 
        } from 'react-native';
import { Container, Header, Icon, Item, Input, Text, Image, AnimatedView} from 'native-base';
import { SearchBar } from 'react-native-elements';

import baseURL from "../../assets/common/baseUrl";
import axios from 'axios';

import Footer from '../../Shared/Footer'
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import { useFocusEffect } from '@react-navigation/native'
import MarqueeText from 'react-native-marquee';
// import HSNZ from "react-native-marquee-scroll";


var { height } = Dimensions.get("window")
const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');


const ProductContainer = (props) => {

  const [products, setProducts ] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [loading, setLoading] = useState(true)

   

  useFocusEffect((
      useCallback(
        () => {
          setFocus(false);
          setActive(-1);
          
          // Products
          axios
            .get(`${baseURL}/products/`)
            .then((respone) => {
              setProducts(respone.data);
              setProductsFiltered(respone.data);
              setProductsCtg(respone.data);
              setInitialState(respone.data);
              setLoading(false)
            })
            .catch((error) => {
              console.log('Api call error')
            })
      
          // Categories
          axios
            .get(`${baseURL}/categories/`)
            .then((res) => {
              setCategories(res.data)
            })
            .catch((error) => {
              console.log('Api call error')
            })

            
      
          return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
          };
        },
        [],
      )
    ))
  
  const searchProduct = (text) => {
      setProductsFiltered(
        products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
      );
    };

  const openList = () => {
    setFocus(true);
  }

  const onBlur = () => {
    setFocus(false);
  }
  // const _onFocus = () => {
  
  // }
  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

 
  return (
    <>
    {loading == false ? (
      <Container>
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
              showLoading={false}
              platform={Platform.OS}
              // clearIcon={true}
              // value={search}
              inputStyle={{backgroundColor: '#EEEEEE', marginLeft: 12}}
              containerStyle={{backgroundColor: 'white'}}
              // placeholderTextColor={'#g5g5g5'}
              style={styles.searchBar}
              searchIcon={{ size: 30 }}
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
            navigation={props.navigation}
            productsFiltered={productsFiltered} 
            />
        ) : (
            <View >
              <View>
                <Banner />
              </View>
              
              <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
              </View>
              <View>
              <MarqueeText
                style={{ paddingTop: 5, paddingBottom: 5, fontSize: 18 }}
                duration={10000}
                marqueeOnStart
                loop
                marqueeDelay={2000}
                marqueeResetDelay={1000}
              >
              Sản phẩm chính hãng T3O Store
              </MarqueeText>   
              {/* <HSNZ
                loop={-1}
                direction={"ltr"}
                autoPlay={true}
                speed={20}
                onEnd={this.end}
              >
                
              </HSNZ> */}
              </View>
              {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                  {productsCtg.map((item) => {
                      return(
                          <ProductList
                              navigation={props.navigation}
                              key={item.name}
                              item={item}
                          />
                      )
                  })}
                </View>
              ) : (
                <View style={styles.center, { height: '40%'}}>
                  <Text>No product found</Text>
                </View>
              )}
              <View style={styles.listContainer}>
              </View>
            </View>
        )}
        <Footer />
      </View>
      </ScrollView>
      </Container>
   ):(
     //Loading
      <Container style={[styles.center, { backgroundColor: "#f2f2f2"}]}>
        <ActivityIndicator size="large" color="red" />
      </Container> 
  )}
  </>
  );
};

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
  searchBar: {
    paddingLeft: 10,
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center'
  }
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