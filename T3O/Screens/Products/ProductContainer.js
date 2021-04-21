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
// const data = require('../../assets/data/products.json');
// const productCategories = require('../../assets/data/categories.json');


const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true)
  
    useFocusEffect((
      useCallback(
        () => {
          setFocus(false);
          setActive(-1);
          
          // Products
          axios
            .get(`${baseURL}/products`)
            .then((res) => {
              setProducts(res.data);
              setProductsFiltered(res.data);
              setProductsCtg(res.data);
              // console.log(res.data);
              setInitialState(res.data);
              setLoading(false)
            })
            .catch((error) => {
              console.log('Api call error')
            })
      
          // Categories
          axios
            .get(`${baseURL}/categories`)
            .then((res) => {
              setCategories(res.data),
              console.log(res.data)
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
      
     
    
  
    // Product Methods
    const searchProduct = (text) => {
      setProductsFiltered(
        products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
      );
    };
  
    const openList = () => {
      setFocus(true);
    };
  
    const onBlur = () => {
      setFocus(false);
    };
  
    // Categories
    const changeCtg = (ctg) => {
      {
        ctg === "all"
          ? [setProductsCtg(initialState), setActive(true)]
          : [
              setProductsCtg(
                products.filter((i) => {
                  i.category._id === ctg
                  // console.log(i.category._id)
                }
                ),
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
              <Text>
                Sản phẩm chính hãng T3O Store
              </Text>    
              </View>
              {/* {console.log(productsCtg.length)} */}
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
                  <Text>Không tìm thấy sản phẩm nào!</Text>
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
})
export default ProductContainer;