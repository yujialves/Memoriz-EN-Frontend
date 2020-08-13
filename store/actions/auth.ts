import * as actionTypes from "./actionTypes";
import { Dispatch } from "redux";
import * as loadingsAction from "./loadings";
import axios from "axios";
import { baseURL } from "../../secrets/constants";

type Response = {};

export const login = (user: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (validateUser(user) && validatePassword(password)) {
      dispatch(loadingsAction.setIsLoging(true));
      // レスポンスとして新しい問題を得る
      const response: Response = await axios.post(
        baseURL + "auth/login",
        JSON.stringify({ user, password })
      );
      dispatch(loadingsAction.setIsLoging(false));
    } else {
      dispatch(setLoginError("ログインに失敗しました。"));
    }
  };
};

const setUser = (user: string, password: string) => {
  return {
    type: actionTypes.SET_USER,
    user,
    password,
  };
};

const setToken = (token: string) => {
  return {
    type: actionTypes.SET_TOKEN,
    token,
  };
};

const setLoginError = (loginErrorText: string) => {
  return {
    type: actionTypes.SET_LOGIN_ERROR,
    loginErrorText,
  };
};

const validateUser = (user: string) => {
  return /^[a-zA-Z][\w]{7,}$/.test(user);
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};
