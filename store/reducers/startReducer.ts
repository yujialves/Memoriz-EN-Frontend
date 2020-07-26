import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  started: boolean;
};

const initialState = {
  started: false,
};

const startReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_STARTED:
      return {
        started: action.started
      };
  }
  return state;
};

export default startReducer;
