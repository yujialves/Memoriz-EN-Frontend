import * as actionTypes from "./actionTypes";
import { Dispatch } from "redux";
import * as loadingsAction from "./loadings";
import axios from "axios";
import { baseURL } from "../../secrets/constants";

type ResponseData = {
  user: string;
  password: string;
  token: string;
  refreshToken: string;
  expireDate: number;
};

export const login = (user: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (validateUser(user) && validatePassword(password)) {
      dispatch(loadingsAction.setIsLoging(true));
      // レスポンスとして新しい問題を得る
      const response = await axios
        .post(baseURL + "auth/login", JSON.stringify({ user, password }))
        .catch((err) => {
          dispatch(setLoginError("ログインに失敗しました。"));
        });
      if (response) {
        dispatch(setLoginError(""));
        const responseData: ResponseData = response.data;
        dispatch(setUser(responseData.user, responseData.password));
        dispatch(
          setToken(
            responseData.token,
            responseData.refreshToken,
            responseData.expireDate
          )
        );
      }
      dispatch(loadingsAction.setIsLoging(false));
    } else {
      dispatch(setLoginError("ログインに失敗しました。"));
    }
  };
};

const setUser = (user: string, password: string) => {
  localStorage.setItem("user", user);
  return {
    type: actionTypes.SET_USER,
    user,
    password,
  };
};

const setToken = (token: string, refreshToken: string, expireDate: number) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("expireDate", expireDate.toString());
  return {
    type: actionTypes.SET_TOKEN,
    token,
    refreshToken,
    expireDate,
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
