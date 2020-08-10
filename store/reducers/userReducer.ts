import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  user: string;
  password: string;
  token: string;
};

const initialState = {
  user: "",
  password: "",
  token: "",
};

const userReducer = (state = initialState, action: Action) => {
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
      };
  }
  return state;
};

export default userReducer;
