import React from 'react'
import {
        StyleSheet,
        View,
        Dimensions,
        Image,
        Text,
        Button
} from 'react-native'

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;

    return (
        <View style={styles.container}>
            <Image 
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name    
            }
            </Text>
            <Text style={styles.price}>${price}</Text>
            {   countInStock > 0 ? (
                <View style={{ marginBottom: 20}}>
                    <Button title={'Add'} color={'green'} />
                </View>
            ) : <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 5,
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
    },
    image: {
        width: width / 2 - 20 - 5,
        paddingTop: 165,
        height: 20,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -0
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 55,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'left'
    },
    price: {
        fontSize: 16,
        color: 'red',
        marginTop: 10,
        textAlign: 'right'
    }
})
export default ProductCard;