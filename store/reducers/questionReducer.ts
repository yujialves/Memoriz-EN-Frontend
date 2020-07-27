import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  id: number;
  question: string;
  answer: string;
  grade: number;
  rest: number;
  loading: boolean;
};

export type Question = {
  id: number | null;
  question: string | null;
  answer: string | null;
  grade: number | null;
  rest: number | null;
  loading?: boolean;
};

const initialState: Question = {
  id: null,
  question: "",
  answer: "",
  grade: null,
  rest: null,
  loading: true,
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTION:
      return {
        id: action.id,
        question: action.question,
        answer: action.answer,
        grade: action.grade,
        rest: action.rest,
        loading: false,
      };
    case actionTypes.SET_QUESTION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
  }
  return state;
};

export default subjectsReducer;
