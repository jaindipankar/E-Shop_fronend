import React, { useState } from "react";
import { View, Button } from "react-native";
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
  Title,
} from "native-base";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item) => {
          return (
            <ListItem key={item.name} onPress={() => setSelected(item.value)}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected == 3 ? (
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Picker
              mode="dialog"
              iosIcon={<Icon name={"arrow-down"} />}
              headerStyle={{ backgroundColor: "orange" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              headerBackButtonText="Baaack!"
              selectedValue={card}
              onValueChange={(x) => setCard(x)}
            >
              {paymentCards.map((c) => {
                return (
                  <Picker.Item key={c.name} label={c.name} value={c.name} />
                );
              })}
            </Picker>
          </View>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;
