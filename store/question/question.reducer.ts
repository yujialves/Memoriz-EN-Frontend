import * as actionTypes from "./question.type";

type Action = {
  type: string;
  id: number;
  question: string;
  answer: string;
  grade: number;
  rest: number;
};

export type Question = {
  id: number;
  question: string;
  answer: string;
  grade: number;
  rest: number;
};

const initialState: Question = {
  id: 0,
  question: "",
  answer: "",
  grade: 0,
  rest: 0,
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTION:
      return {
        ...state,
        id: action.id,
        question: action.question,
        answer: action.answer,
        grade: action.grade,
        rest: action.rest,
      };
  }
  return state;
};

export default subjectsReducer;
