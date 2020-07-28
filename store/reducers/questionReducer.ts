import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  id: number;
  question: string;
  answer: string;
  grade: number;
  rest: number;
};

export type Question = {
  id: number | null;
  question: string | null;
  answer: string | null;
  grade: number | null;
  rest: number | null;
};

const initialState: Question = {
  id: null,
  question: "",
  answer: "",
  grade: null,
  rest: null,
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
