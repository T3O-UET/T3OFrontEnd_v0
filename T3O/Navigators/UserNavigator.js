import React, {useContext} from 'react'
import {createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'
import UserMenu from '../Screens/User/UserMenu'
import OrdersManage from '../Screens/User/OrdersManage'
import AuthGlobal from '../Context/store/AuthGlobal'

const Stack = createStackNavigator();

function MyStack() {
    const context = useContext(AuthGlobal);

    return (
        <Stack.Navigator>
            {context.stateUser.isAuthenticated ? 
                null: (
                <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
                 />
            )}
            {context.stateUser.isAuthenticated ? 
                null: (
                <Stack.Screen
                 name="Register"
                 component={Register}
                 options={{
                     headerShown: false
                 }}
                /> 
            )}
           
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