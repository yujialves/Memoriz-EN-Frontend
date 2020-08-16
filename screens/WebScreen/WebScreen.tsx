import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const WebScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.description}>
          このアプリをPWAとして使用することを推奨します。アプリをホーム画面に追加してください。
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "flex-end",
    paddingBottom: 16,
    flex: 1,
  },
  logo: {
    width: Dimensions.get("window").width * 0.65,
    height: 70,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontWeight: "bold",
    color: Colors.boldText,
    fontSize: 16,
    paddingHorizontal: 8,
    textAlign: "center",
  },
});

export default WebScreen;
