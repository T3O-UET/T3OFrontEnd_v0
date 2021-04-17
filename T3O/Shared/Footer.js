import React from 'react'
import {StyleSheet, Image, SafeAreaView, Text, View, H1, Dimensions} from 'react-native'

var width = Dimensions.get('window')
const Footer = () => {
    return (
        <SafeAreaView style={styles.footer}>
            <View>
                <View>
                <Text style={ styles.slogan}>
                    T3O Store - Uy Tín là số 1
                </Text> 
                </View>
                <View>
                <Text style={ styles.contact}>
                Liên hệ: 0928230347
                </Text> 
                <Text style={ styles.contact}>
                Email   : t3ostore@gmail.com
                </Text>
                </View>
                <View>
                <Text style={ styles.address}>
                Địa chỉ: số 20, phường Mai Dịch, quận Cầu Giấy, Hà nội.
                </Text> 
                </View>
                <View>
                <Text style={styles.title}>
                    Edit by t3o team https://github.com/T3O-UET
                </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    footer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "center",
        
        // backgroundColor: '#312F2F'
    },
    slogan: { 
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingTop: 20,
        color: 'black'
    },
    contact: {
        paddingLeft: 70,
        fontSize: 14,
        color: 'black'
    },
    address: {  
        textAlign: 'center',
        fontSize: 14,
        paddingBottom: 20,
        color: 'black'
    },
    title: {
        textAlign: 'center',
        paddingBottom:5,
        width: 360,
        fontStyle: 'italic',
        paddingTop: 5,
        fontSize: 8,
        color: 'white',
        backgroundColor: 'black'
    }
})

export default Footer;