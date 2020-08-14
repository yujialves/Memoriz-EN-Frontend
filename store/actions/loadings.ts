import * as actionTypes from "./actionTypes";

export const setLoadingQuestion = (isLoadingQuestion: boolean) => {
  return {
    type: actionTypes.SET_LOADING_QUESTION,
    isLoadingQuestion,
  };
};

export const setIsLoging = (isLoging: boolean) => {
  return {
    type: actionTypes.SET_IS_LOGING,
    isLoging,
  };
};
