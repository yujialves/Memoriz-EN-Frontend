import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  question: "";
  answer: "";
};

export type Question = {
  question: string | null;
  answer: string | null;
};

const initialState: Question = {
  question: "",
  answer: "",
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTION:
      return {
        question: action.question,
        answer: action.answer,
      };
  }
  return state;
};

export default subjectsReducer;
