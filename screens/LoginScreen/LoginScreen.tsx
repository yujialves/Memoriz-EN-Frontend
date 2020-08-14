import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}
        ></Image>
      </View>
      <View style={styles.form}>
        <LoginForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: "10%",
    justifyContent: "flex-end",
  },
  logo: {
    width: Dimensions.get("window").width * 0.65,
    height: 70,
    resizeMode: "contain",
  },
  form: {
    height: "30%",
    justifyContent: "center",
  },
});

export default LoginScreen;
