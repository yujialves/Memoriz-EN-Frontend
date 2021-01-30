import * as actionTypes from "./auth.type";
import { Dispatch } from "redux";
import * as loadingsAction from "../loadings/loadings.action";
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

export const refreshToken = (refreshToken: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .get(baseURL + "auth/refresh", {
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      })
      .catch((err) => {
        dispatch(setToken("", "", null));
      });
    if (response) {
      const responseData: ResponseData = response.data;
      dispatch(
        setToken(
          responseData.token,
          responseData.refreshToken,
          responseData.expireDate
        )
      );
    }

    console.log(response);
  };
};

export const setUser = (user: string, password: string) => {
  storeUser(user, password);
  return {
    type: actionTypes.SET_USER,
    user,
    password,
  };
};

export const setToken = (
  token: string,
  refreshToken: string,
  expireDate: number | null
) => {
  storeToken(token, refreshToken, expireDate);
  return {
    type: actionTypes.SET_TOKEN,
    token,
    refreshToken,
    expireDate,
  };
};

const storeUser = (user: string, password: string) => {
  localStorage.setItem("user", user);
};

const storeToken = (
  token: string,
  refreshToken: string,
  expireDate: number | null
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem(
    "expireDate",
    expireDate === null ? "" : expireDate.toString()
  );
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
