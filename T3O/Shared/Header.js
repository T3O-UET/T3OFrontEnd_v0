import React from 'react'
import {StyleSheet, Image, SafeAreaView, Text} from 'react-native'

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image
                style={styles.image}
                source={require("../assets/logo.png")}
                resizeMode="contain"
            />
            <Text style={styles.title}>
                T3O Store
            </Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        paddingTop: 20,
        marginTop: 25,
        paddingBottom: 10,
        // backgroundColor: Platform.OS === 'android' ? '#72bcd4' : '#ffffff',
        // borderBottomColor: Platform.OS === 'android' ? '#ffffff' : '#72bcd4',
        // borderBottomWidth: 1
    },
    image: {
        height: 48,
        width: 70,
        paddingLeft: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        paddingRight: 30
    }
})

export default Header;