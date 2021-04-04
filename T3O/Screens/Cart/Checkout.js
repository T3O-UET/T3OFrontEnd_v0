import React from 'react';
import { Text } from 'react-native';

import { connect } from 'react-redux';


const Cart = () => {
    <Text> CART WORKS </Text>
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps, null)(Cart);