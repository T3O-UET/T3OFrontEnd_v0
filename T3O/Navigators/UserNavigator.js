import React from 'react'
import {createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'
import UserMenu from '../Screens/User/UserMenu'
import OrdersManage from '../Screens/User/OrdersManage'

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="User Menu"
                component={UserMenu}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Orders Manage"
                component={OrdersManage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator(){
    return <MyStack />
}