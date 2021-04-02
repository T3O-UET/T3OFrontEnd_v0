import React from 'react'
import {StyleSheet, Image, SafeAreaView, Text} from 'react-native'

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image

                source={require("../assets/logo.png")}
                resizeMode="contain"
                style={{ height: 70}}
            />
            <Text style={styles.title}>
                T3OSHOP
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
        padding: 20,
        marginTop: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        paddingRight: 30
    }
})

export default Header;