import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  isLoadingQuestion: boolean;
};

const initialState = {
  isLoadingQuestion: false,
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_QUESTION:
      return {
        ...state,
        isLoadingQuestion: action.isLoadingQuestion,
      };
  }
  return state;
};

export default subjectsReducer;
