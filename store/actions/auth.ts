import * as actionTypes from "./actionTypes";
import { Dispatch } from "redux";

export const login = (user: string, password: string) => {
  return async (dispatch: Dispatch) => {};
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
