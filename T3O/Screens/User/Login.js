import React , {useState}from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import FormContainer from '../Form/FormContainer';
import Input from '../Form/Input';
import MyButton from "../../Shared/MyButton";
import Error from '../../Shared/Error';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] =useState("")

    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === ""){
            setError("Email và Password là bắt buộc")
        } else {
            console.log('success')
        }
    }

    return (
        <FormContainer title={"Login"}>
           <Input
            placeholder={"Nhập Email"}
            name={"email"}
            id={"email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
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