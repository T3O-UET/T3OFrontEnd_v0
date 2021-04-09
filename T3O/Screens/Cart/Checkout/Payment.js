import React, { useState } from 'react'
import { View, Button } from 'react-native'
import {
    Container,
    Header,
    Content,
    ListItem,
    Text,
    Radio,
    Right,
    Left,
    Picker,
    Icon,
    Body,
    Title
} from 'native-base';

const methods = [
    { name: 'Thanh toán khi nhận hàng.', value: 1 },
    { name: 'Momo', value: 2 },
    { name: 'Tài khoản ngân hàng', value: 3}
]

const Payment = (props) => {

    const order = props.route.params;

    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    return(
       <Container>
           <Header style={{ height: 70}}>
                   <Title style={{paddingTop: 15, fontSize: 25}}>Chọn hình thức thanh toán</Title>
           </Header>
           <Content>
               {methods.map((item, index) => {
                   return (
                       <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                           <Left>
                            <Text style={{ fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
                           </Left>
                           <Right>
                               <Radio selected={selected == item.value}/>
                           </Right>
                       </ListItem>
                   )
               })}
               {selected == 3 ? (
                 <View style={{paddingLeft: 14}}>
                    <Picker
                        selectedValue={card}
                        headerStyle={{ backgroundColor: 'orange' }}
                        headerBackButtonTextStyle={{ color: '#fff' }}
                        headerTitleStyle={{ color: '#fff' }}
                        style={{ height: 50, width: 200, color: 'blue'}}
                        onValueChange={(x) => setCard(x)}
                    >
                        <Picker.Item label="BIDV" value="bidv" />
                        <Picker.Item label="Techcombank" value="techcombank" />      
                        <Picker.Item label="Vietcombank" value="vietcombank"/> 
                    </Picker>
                 </View>  
                
               ) : null }
               <View style={{ marginTop: 60, alignSelf: 'center' }}>
                       <Button 
                       title={"Xác nhận"} 
                       onPress={() => props.navigation.navigate("Xác nhận", { order })}/>
               </View>
           </Content>
       </Container>
    )
}

export default Payment;