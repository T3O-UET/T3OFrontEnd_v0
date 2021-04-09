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
           <Header>
               <Body>
                   <Title>Chọn hình thức thanh toán</Title>
               </Body>
           </Header>
           <Content>
               {methods.map((item, index) => {
                   return (
                       <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                           <Left>
                            <Text>{item.name}</Text>
                           </Left>
                           <Right>
                               <Radio selected={selected == item.value}/>
                           </Right>
                       </ListItem>
                   )
               })}
               {selected == 3 ? (
                <Picker
                    selectedValue={card}
                    headerStyle={{ backgroundColor: 'orange' }}
                    headerBackButtonTextStyle={{ color: '#fff' }}
                    headerTitleStyle={{ color: '#fff' }}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(x) => setCard(x)}
                  >
                    <View style={{ paddingLeft: 100}}>  
                    <Picker.Item label="BIDV" value="bidv" />
                    <Picker.Item label="Techcombank" value="techcombank" />      
                    <Picker.Item label="Vietcombank" value="vietcombank" /> 
                    </View>
                   </Picker>
               ) : null }
               <View style={{ marginTop: 60, alignSelf: 'center' }}>
                       <Button 
                       title={"Confirm"} 
                       onPress={() => props.navigation.navigate("Confirm", { order })}/>
               </View>
           </Content>
       </Container>
    )
}

export default Payment;