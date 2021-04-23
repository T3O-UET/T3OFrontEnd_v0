import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"
import MyButton from "../../Shared/MyButton";
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

import AuthGlobal from "../../Context/store/AuthGlobal"
import { useEffect } from 'react/cjs/react.development';

var width = Dimensions.get("window")

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()

    useFocusEffect(
        useCallback(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }
        console.log(context.stateUser.user);

        AsyncStorage.getItem("jwt")
            .then((res) => {
                const AuthStr = 'Bearer '.concat(res); 
                axios.get(`${baseURL}/users/getCurrentUser`, { headers: { Authorization: AuthStr } })
                    .then((user) => setUserProfile(user.data))
                    .then(res => {
                        // If request is good...
                        console.log("Good request "+res.data);
                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });
            })
            .catch((error) => console.log(error))


        return () => {
            setUserProfile();
        }

    }, [context.stateUser.isAuthenticated]))

    return (
       <Container style={styles.container}>
           <ScrollView contentContainerStyle={styles.subContainer}> 
                <View style={{alignItems: 'center',}}>
                    <Text style={{ 
                    fontSize: 22, 
                    fontWeight: "bold", 
                    paddingTop: 20,
                    paddingBottom: 30
                    }}> Thông tin khách hàng </Text> 
                </View>
                <Text style={styles.text}>
                    Họ và tên:        {userProfile ? userProfile.name : "" }
                </Text>        
               <Text style={styles.text}>
                    Email:               {userProfile ? userProfile.email : "" }
               </Text>
               <Text style={styles.text}>
                    Số điện thoại: {userProfile ? userProfile.phone : "" }
               </Text>
               <Text style={styles.text}>
                    Địa chỉ:             {userProfile ? userProfile.address : "" }
                </Text> 
                <Text style={styles.text}>
                    Thành phố:      {userProfile ? userProfile.city : "" }
                </Text> 
               <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <MyButton style={{                            
                            backgroundColor:'#36CBDA', 
                            borderRadius: 20, 
                            }} large primary onPress={() => handleSubmit()}>
                        <Text style={{ color: "white" }}>Sửa thông tin</Text>
                        </MyButton>
               </View>  
           </ScrollView>
       </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        paddingLeft: 10,
        marginTop: 30
    },
    text: {
        fontSize: 20, 
        backgroundColor: '#D6D5D5', 
        borderRadius: 20, 
        paddingLeft: 10, 
        padding: 5, 
        paddingBottom: 5 ,
        marginBottom: 5,
    }
})

export default UserProfile;