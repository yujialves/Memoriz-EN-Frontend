import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FormInput from "../FormInput/FormInput";
import BigButton from "../BigButton/BigButton";

const LoginForm: React.FC = () => {
  return (
    <View>
      <FormInput placeholder="ユーザー名" />
      <FormInput placeholder="パスワード" />
      <Text style={styles.failureText}>ログインに失敗しました。</Text>
      <BigButton title="ログイン" />
    </View>
  );
};

const styles = StyleSheet.create({
  failureText: {
    color: "red",
    fontSize: 12,
  },
});

export default LoginForm;
