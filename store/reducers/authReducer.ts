import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  user: string;
  password: string;
  token: string;
  expireDate: number;
  refreshToken: string;
};

const initialState = {
  user: "",
  password: "",
  token: "",
  expireDate: null,
  refreshToken: "",
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
        expireDate: action.expireDate,
      };
    case actionTypes.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
  }
  return state;
};

export default authReducer;
