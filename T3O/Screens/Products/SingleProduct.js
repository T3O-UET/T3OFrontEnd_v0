import React, {useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native'
import { Left, Right, Container, H1} from 'native-base';

const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');

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
                    <Button title="Add" />
                </Right>
            </View>
        </Container>
    )
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


export default SingleProduct;