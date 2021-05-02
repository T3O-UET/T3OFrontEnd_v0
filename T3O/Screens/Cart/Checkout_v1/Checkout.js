import React, { useEffect, useState, useContext} from 'react'
import { View, Button, Text } from 'react-native'
import FormContainer from '../../Form/FormContainer'
import Input from '../../Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import AsyncStorage from "@react-native-community/async-storage"
import axios from "axios"
import baseURL from "../../../assets/common/baseUrl"
import AuthGlobal from "../../../Context/store/AuthGlobal"


const Checkout = (props) => {
    const context = useContext(AuthGlobal)
    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ phone, setPhone ] = useState();
    const [ user, setUserId ] = useState();
    // const [selected, setSelected] = useState();
    // const [card, setCard] = useState();

    var cart = []
    var Item = function(id, quantity, name, image, price){
        this.id = id
        this.quantity = quantity
        this.name = name
        this.image = image
        this.price = price
    }

    // console.log("Cart Item")
    // console.log(props.cartItems)
    props.cartItems.forEach(item => {
        // console.log("This Item")
        // console.log(item.product.id)
        var quantity = 1
        var item = new Item(item.product.id, quantity, item.product.name, item.product.image, item.product.price) 
        cart.push(item)
    });
   
    console.log("My New Cart Id")
    console.log(cart)
    useEffect(() => {
        // console.log(context.stateUser.user.id)
        console.log("Checkout Screen")
        // console.log(props.cartItems)
        // setOrderItems(props.cartItems)

        return () => {
            // setOrderItems();
            setUserId(context.stateUser.user.id)
            // console.log(userProfile.name);
            // setUserId();
        }
    }, [])
   
    const checkOut = () => {
        let order = {
            city,
            dateOrdered: Date.now(),
            orderItems: cart,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            user: context.stateUser.user.id,
            // selected,
            // card
        }

        props.navigation.navigate("Thanh toán", {order: order })
    }

    return (
        
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >   
            <FormContainer title={"Địa chỉ giao hàng"}>
                
                <Input
                    placeholder={"Số điện thoại"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                   <Input
                    placeholder={"Địa chỉ giao hàng 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                   <Input
                    placeholder={"Địa chỉ giao hàng 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                   <Input
                    placeholder={"Thành phố"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <View style={{ width: '80%', alignItems: "center", marginTop:40 }}>
                    <Button title="Xác nhận" onPress={() => checkOut()}/>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout)