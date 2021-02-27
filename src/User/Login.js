import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import AuthGlobal from "../../Context/store/AuthGlobal";
import EasyButton from "../../Shared/StyledComponents/Easybutton";
import { loginUser } from "../../Context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("UserProfile");
    }
  }, [context.stateUser.isAuthenticated]);
  const handleSubmit = () => {
    const user = { email, password };
    if (email === "" || password === "") {
      setError("Email and password cannot be empty");
    } else {
      loginUser(user, context.dispatch);
    }
  };
  return (
    <FormContainer title="Login">
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={handleSubmit}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
      </View>
      <View style={[styles.buttonGroup, { marginTop: 40 }]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});
