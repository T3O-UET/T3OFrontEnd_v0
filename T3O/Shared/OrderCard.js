import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MyButton from "./MyButton";
import Toast from "react-native-toast-message";
import TrafficLight from "./TrafficLight";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";

const codes = [
  { name: "Đang chờ xử lý", code: "3" },
  { name: "Đã ship", code: "2" },
  { name: "Đã giao hàng", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("Đang chờ xử lý");
      setCardColor("#E74C3C");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("Đã ship");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("Đã giao hàng");
      setCardColor("#2ECC71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
    };

    axios
      .put(`${baseURL}/orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Đã sửa đơn hàng.",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Opps, có lỗi xảy ra.",
          text2: "Xin vui lòng thử lại",
        });
      });
  };

  return (
    <View style={[{ backgroundColor: '#D6D5D5', borderRadius: 20 }, styles.container]}>
      <View style={{ marginTop: 10 }}>
        <Text style={{fontSize: 14, color: 'blue'}}>Mã đơn hàng: #{props.id}</Text>
        <Text style={{fontSize: 16}}>
          Trạng thái: {statusText} {orderStatus}
        </Text>
        <Text style={{fontSize: 16}}>
            Địa chỉ giao 1: {props.shippingAddress1}
        </Text>
        <Text style={{fontSize: 16}}>
            Địa chỉ giao 2: {props.shippingAddress2}
        </Text>
        <Text style={{fontSize: 16}}>Thành phố:    {props.city}</Text>
        <Text style={{fontSize: 16}}>Ngày đã giao: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text style={{fontSize: 16}}>Giá: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
        {props.editMode ? (
          <View>
            <Picker
              mode="dropdown"
              iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              placeholder="Change Status"
              placeholderIconColor={{ color: "#007aff" }}
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return (
                  <Picker.Item key={c.code} label={c.name} value={c.code} />
                );
              })}
            </Picker>
            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
      fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default OrderCard;