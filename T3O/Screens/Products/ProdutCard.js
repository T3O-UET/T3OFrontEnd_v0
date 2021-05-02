import React from 'react'
import {
        StyleSheet,
        View,
        Dimensions,
        Image,
        Text,
        Button,
        TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message'
import { Left, Right, Container, H1} from 'native-base';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;

    // console.log("Product card")
    // console.log(props)
    return (
        <View style={styles.container}>
            <Image 
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ? image : 'https://3wga6448744j404mpt11pbx4-wpengine.netdna-ssl.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif'}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name    
            }
            </Text>
            <View style={styles.bottomCard}>
                <Text style={styles.price}>${price}</Text>
                {   countInStock > 0 ? (
                        // <Button title="Add" />
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => {
                                 props.addItemToCart(props),
                                 Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${name} đã được thêm vào giỏ hàng`,
                                    text2: "Đi đến giỏ hàng để xác nhận đơn hàng ngay nào!"
                                })
                             }}>
                                <View style={{
                                    backgroundColor: '#3399FF', alignItems: 'center',
                                    justifyContent: 'center', borderRadius: 4
                                }}
                                >
                                    
                                    <Text style={{ color: 'white', fontWeight:'bold', padding: 3 }}>ADD</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : <Text style={{ marginTop: 20 }}>Hiện tại hết hàng!</Text>
                }
            </View>           
        </View>
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
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 5,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 10,
        elevation: 8,
        alignItems: 'center',
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
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        // textAlign: 'left',
        textAlign: 'center'
    },
    price: {
        fontWeight:'bold',
        fontSize: 18,
        color: 'red',
    },
    button: {
        width: 60,
        backgroundColor: '#3399FF', alignItems: 'center',
        justifyContent: 'center', borderRadius: 4
    }
})
export default connect(null, mapDispatchToProps)(ProductCard);