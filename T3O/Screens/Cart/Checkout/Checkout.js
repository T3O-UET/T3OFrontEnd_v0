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
    const [status, setStatus] = useState();
   
  
    useEffect(() => {
        setOrderItems(props.cartItems)

        return () => {
            setOrderItems();
            setStatus("waiting");
        }
    }, [])
   
    const checkOut = () => {
        
        let order = {
            city,
            // dateOrdered: Date.now(),
            products: orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            user: context.stateUser.user.id,
            status: status,
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