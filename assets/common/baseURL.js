import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://a6a3ddbb5812.ngrok.io/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}

export default baseURL;
