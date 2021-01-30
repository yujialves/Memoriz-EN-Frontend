import * as actionTypes from "./loadings.type";

type Action = {
  type: string;
  isLoadingQuestion: boolean;
  isLoging: boolean;
  isFetchingQuestionList: boolean;
};

const initialState = {
  isLoadingQuestion: false,
  isLoging: false,
  isFetchingQuestionList: false,
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
    case actionTypes.SET_FETCHING_QUESTION_LIST:
      return {
        ...state,
        isFetchingQuestionList: action.isFetchingQuestionList,
      };
  }
  return state;
};

export default subjectsReducer;
