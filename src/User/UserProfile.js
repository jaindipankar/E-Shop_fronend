import React, { useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  // console.log(context.stateUser);
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => {
              // console.log(user.data);
              setUserProfile(user.data);
            })
            .catch((err) => {
              
            });
        })
        .catch((error) => console.log(error));

      // axios
      //   .get(`${baseURL}orders`)
      //   .then((x) => {
      //     const data = x.data;
      //     console.log(data);
      //     const userOrders = data.filter(
      //       (order) => order.user._id === context.stateUser.user.sub
      //     );
      //     setOrders(userOrders);
      //   })
      //   .catch((error) => console.log(error));

      return () => {
        setUserProfile();
      };
    }, [context.stateUser.isAuthenticated])
  );
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});