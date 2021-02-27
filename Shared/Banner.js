import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
var { width } = Dimensions.get("window");
const Banner = () => {
  const [bannerdata, setBannerData] = useState([]);
  useEffect(() => {
    setBannerData([
      "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg",
      "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/79/Flower_garden_%281%29.jpg",
    ]);
    return () => {
      setBannerData([]);
    };
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            autoplay={true}
            showsButtons={false}
            autoplayTimeout={2}
            style={{ height: width / 2 }}
          >
            {bannerdata.map((item) => {
              return (
                <Image
                  source={{ uri: item }}
                  key={item}
                  resizeMode="contain"
                  style={styles.image}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
