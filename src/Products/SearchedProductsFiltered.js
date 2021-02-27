import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Content, Left, ListItem, Body, Text, Thumbnail } from "native-base";

const SearchedProducts = (props) => {
  var { width } = Dimensions.get("window");
  const { productsFiltered } = props;
  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem
            key={item.id}
            avatar
            onPress={() =>
              props.navigation.navigate("Product Detail", { item: item })
            }
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>No products match</Text>
        </View>
      )}
    </Content>
  );
};

export default SearchedProducts;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
