import React, { useEffect, useState} from 'react'
import { Text, View } from 'react-native'
import {Item, Picker } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'

const Checkout = () => {

    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ phone, setPhone ] = useState();

    useEffect(() => {
        setOrderItems(props.cartItems)

        return () => {
            setOrderItems();
        }
    }, [])

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHight={200}
        >

        </KeyboardAwareScrollView>
    )
}


export default Checkout;