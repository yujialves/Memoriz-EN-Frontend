import * as actionTypes from "./auth.type";

type Action = {
  type: string;
  user: string;
  password: string;
  token: string;
  expireDate: number;
  refreshToken: string;
  loginErrorText: string;
};

const initialState = {
  user: "",
  password: "",
  token: "",
  expireDate: null,
  refreshToken: "",
  loginErrorText: "",
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        password: action.password,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
        expireDate: action.expireDate,
      };
    case actionTypes.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    case actionTypes.SET_LOGIN_ERROR:
      return {
        ...state,
        loginErrorText: action.loginErrorText,
      };
  }
  return state;
};

export default authReducer;
