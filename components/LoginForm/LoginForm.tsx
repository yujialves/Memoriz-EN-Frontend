import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import FormInput from "../FormInput/FormInput";
import BigButton from "../BigButton/BigButton";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const loginErrorText = useSelector(
    (state: { auth: { loginErrorText: string } }) => state.auth.loginErrorText
  );

  const loginHandler = () => {
    dispatch(authActions.login(user, password));
  };

  return (
    <View style={styles.form}>
      <FormInput placeholder="ユーザー名" value={user} setValue={setUser} />
      <FormInput
        placeholder="パスワード"
        value={password}
        setValue={setPassword}
        hidden
      />
      {loginErrorText !== "" && (
        <View>
          <Text style={styles.failureText}>{loginErrorText}</Text>
        </View>
      )}
      <BigButton title="ログイン" onPress={loginHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
  },
  failureText: {
    color: "red",
    fontSize: 12,
    width: 260,
  },
});

export default LoginForm;
