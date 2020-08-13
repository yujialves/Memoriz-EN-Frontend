import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  isLoadingQuestion: boolean;
  isLoging: boolean;
};

const initialState = {
  isLoadingQuestion: false,
  isLoging: false,
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_QUESTION:
      return {
        ...state,
        isLoadingQuestion: action.isLoadingQuestion,
      };
    case actionTypes.SET_IS_LOGING:
      return {
        ...state,
        isLoging: action.isLoging,
      };
  }
  return state;
};

export default subjectsReducer;
