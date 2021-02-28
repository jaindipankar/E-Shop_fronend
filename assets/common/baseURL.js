import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://8a4296829a5e.ngrok.io/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}

export default baseURL;
