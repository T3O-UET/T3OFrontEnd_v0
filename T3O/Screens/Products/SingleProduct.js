import React, {useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native'
import { Left, Right, Container, H1} from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message'

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("");

    return (
        <Container style={styles.containter}>
            <ScrollView style={{ marginBottom: 80, padding: 5}}
            >
                <View>
                    <Text style={styles.tasbar}>Chi tiết sản phẩm</Text>
                    <Image 
                        source={{
                            uri: item.image ? item.image 
                            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                        <H1 style={styles.contentHeader}>{item.name}</H1>
                        <Text style={styles.contentText}>{item.brand}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.price}</Text>
                </Left>
                <Right style={{ paddingRight: 10}}>
                    <Button title="Add" 
                       onPress={() => {
                        props.addItemToCart(props),
                        Toast.show({
                           topOffset: 60,
                           type: "success",
                           text1: `${item.name} added to Cart`,
                           text2: "Go to your cart to complete order"
                       })
                    }}
                    />
                </Right>
            </View>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => 
            dispatch(actions.addToCart({quantity: 1, product}))
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 300
    },
    tasbar: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: "bold",
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    }
})


export default connect(null, mapDispatchToProps)(SingleProduct);