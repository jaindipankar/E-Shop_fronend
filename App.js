import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Header from "./Shared/Header";
import Main from "./Navigators/Main";
import Toast from "react-native-toast-message";
import Auth from "./Context/store/Auth";

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
