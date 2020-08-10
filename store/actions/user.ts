import * as actionTypes from "./actionTypes";

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
