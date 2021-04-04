import React from 'react'
import { Text, View, Dimensions, StyleSheet, Button, TouchableOpacity } from 'react-native'
import {
    Container,
    Left,
    Right,
    H1,
    ListItem,
    Thumbnail,
    Body,
    List
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'


import * as actions from '../../Redux/Actions/cartActions'
import { ScrollView } from 'react-native-gesture-handler'

var {height, width } = Dimensions.get("window")

const Cart = (props) => {
    return (
        // <View style={{ flex: 1}}>
        //     {props.cartItems.map(x => {
        //         return (
        //             <Text>{x.product.name}</Text>
        //         )
        //     })}
        // </View>
        <>
        {props.cartItems.length ? (
            <Container>
                <H1  style={styles.taskbar}>Your Cart</H1>
                <ScrollView>
                {props.cartItems.map(data => {
                    return (
                        <ListItem
                            style={styles.listItem}
                            key={Math.random}
                            avatar
                        >
                            <Left>
                                <Thumbnail 
                                    style={styles.image}
                                    source={{ uri: data.product.image ? data.product.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                                    />
                            </Left>
                            <Body style={styles.body}>
                                <Left>
                                    <Text style={styles.name}>{data.product.name}</Text>
                                </Left>
                                <Right>
                                    <Text style={styles.price}>${data.product.price}</Text>
                                </Right>
                            </Body>
                        </ListItem>
                    )
                })}
                </ScrollView>
            </Container>
        ): (
            <Container style={styles.emptyContainer}>
                <Text>Looks like your cart is empty</Text>
                <Text>Add products to your cart to get  started</Text>
            </Container>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',

    },
    body: {
        margin: 5,
        alignItems: 'center',
        flexDirection: 'row',

    },
    image: {
        height: 100,
        width: 130,
        paddingBottom: 20,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        paddingRight: 20
    },
    taskbar: {
        fontSize: 24,
        paddingTop: 20,
        paddingLeft: 20
    }
})
const mapStateProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateProps, null)(Cart);