import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import FormContainer from "../Form/FormContainer";
import Input from "../Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyButton from "../../Shared/MyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Hãy điền đầy đủ các trường!");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}/users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Đăng ký thành công!",
            text2: "Hãy đăng nhập tài khoản của bạn",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Opp, Đã có lỗi xảy ra!",
          text2: "Vui lòng thử lại.",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <MyButton style={{
                    backgroundColor:'#36CBDA', 
                    borderRadius: 20, 
                    }} large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Đăng ký</Text>
          </MyButton>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{
                paddingTop: 20, 
                color: "blue",
                fontStyle: "italic",
            }}>Trở về trang Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;