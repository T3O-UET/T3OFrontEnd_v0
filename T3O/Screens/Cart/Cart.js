import React , { useContext } from 'react'
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
import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from './CartItem';

import AuthGlobal from '../../Context/store/AuthGlobal'
import * as actions from '../../Redux/Actions/cartActions'
import MyButton from '../../Shared/MyButton'
// import { ScrollView } from 'react-native-gesture-handler'

var {height, width } = Dimensions.get("window")

const Cart = (props) => {

    const context = useContext(AuthGlobal);
    var total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)        
    });
    return (
        <>
        {props.cartItems.length ? (
            <Container>
                <H1  style={styles.taskbar}>Giỏ hàng của bạn</H1>
                <SwipeListView    
            data={props.cartItems}
            renderItem={(data) => (
             <CartItem item={data} />
            )}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity 
                style={styles.hiddenButton}
                onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon style={{ paddingTop: 40}}name="trash" color={"red"} size={40} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
                <View style={styles.bottomContainer}>
                    <Left>
                        <Text style={styles.price}>${total}</Text>
                    </Left>
                    <Right>
                        <Button title="Xóa" 
                            onPress={() => props.clearCart()}
                        />
                    </Right>
                    <Right  style={{ paddingRight: 20}}>
                        {context.stateUser.isAuthenticated ? (
                            <Button title="Kiểm tra" onPress={() => props.navigation.navigate("Checkout")} />
                        ) : (
                            <Button title="Login" onPress={() => props.navigation.navigate('Login')} />
                        )}
                    </Right>
                </View>
            </Container>
        ): (
            <Container style={styles.emptyContainer}>
                <Text>Có vẻ như bạn chưa có sản phẩm nào trong giỏ hàng.</Text>
                <Text>Hãy thêm sản phẩm bạn thích vào giỏ hàng nhé!</Text>
            </Container>
        )}
        </>
    );
};

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
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
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: "white" ,
        elevation: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenBottom: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Cart);