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
        marginTop: 20
    },
    image: {
        height: 35,
        width: 50,
        paddingLeft: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        paddingRight: 30
    }
})

export default Header;