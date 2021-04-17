import React , {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import FormContainer from '../Form/FormContainer';
import Input from '../Form/Input';
import MyButton from "../../Shared/MyButton";
import Error from '../../Shared/Error';

import { Formik } from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';

//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const Login = (props) => {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] =useState("")

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
          props.navigation.navigate("User Profile");
        }
      }, [context.stateUser.isAuthenticated]);

    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === ""){
            setError("Email và Password là bắt buộc")
        } else {
            // console.log('success')
            loginUser(user, context.dispatch);
        }
    }

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={formSchema}>
            { (props) => (
                <FormContainer title={"Login"}>
                    <Input
                    placeholder={"Nhập Email"}
                    name={"email"}
                    id={"email"}
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                    />
                    <Input
                    placeholder={"Nhập Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    /> 
                    <View style={styles.buttonGroup}>
                        {error ? <Error message={error} /> : null}
                        <MyButton style={{
                            backgroundColor:'#36CBDA', 
                            borderRadius: 20, 
                            }} large primary onPress={() => handleSubmit()}>
                        <Text style={{ color: "white" }}>Đăng nhập</Text>
                        </MyButton>
                    </View>
                    <View style={ styles.buttonGroup}>
                        <Text style={styles.middleText}>Bạn chưa có tài khoản?</Text>
                        <MyButton
                        style={{borderRadius: 20}}
                        large
                        secondary 
                        onPress={() => props.navigation.navigate("Register")}>
                        <Text style={{ color: "white" }}>Đăng ký</Text>
                        </MyButton>
                    </View>
                </FormContainer>
            )}      
        </Formik>
    )

}

const styles = StyleSheet.create({
    buttonGroup: {
        paddingTop: 30,
        width: "80%",
        alignItems: "center",
      },
      middleText: {
        marginBottom: 10,
        alignSelf: "center",
        fontStyle: 'italic',
        color: 'red'
      }
})
export default Login;