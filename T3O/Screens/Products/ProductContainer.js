import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Container, Header, Icon, Item, Input, Text} from 'native-base';

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

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search"/>
          <Input 
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? (
            <Icon onPress={onBlur} name="ios-close" />
          ) : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchProduct
          productsFiltered={productsFiltered} 
          />
      ) : (
        <View style={styles.container}>
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
    </Container>
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
  }
})
export default ProductContainer;