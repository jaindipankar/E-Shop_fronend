import React from "react";
import {
  StyleSheet,
  View,
  LogBox,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  Text,
  Left,
  Right,
  H1,
  Container,
  Thumbnail,
  ListItem,
  Body,
} from "native-base";
import EasyButton from "../../Shared/StyledComponents/Easybutton";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as actions from "../../Redux/Actions/cartActions";

LogBox.ignoreAllLogs(true);

var { height, width } = Dimensions.get("window");
const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  // console.log(props);
  return (
    <>
      {props.cartItems.length > 0 ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => {
              return <CartItem item={data} />;
            }}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
            </Left>
            <Right>
              <EasyButton
                danger
                medium
                onPress={() => {
                  props.clearCart();
                }}
              >
                <Text style={{ color: "white" }}>Clear</Text>
              </EasyButton>
            </Right>
            <Right>
              <EasyButton
                primary
                medium
                onPress={() => {
                  props.navigation.navigate("Checkout");
                }}
              >
                <Text style={{ color: "white" }}>Checkout</Text>
              </EasyButton>
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyCart}>
          <Text>Looks like your cart is empty</Text>
          <Text>You need to add some products</Text>
        </Container>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const mapStateToProps = (state) => {
  // console.log(state);
  const { cartItems } = state;
  return {
    cartItems,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  emptyCart: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});
