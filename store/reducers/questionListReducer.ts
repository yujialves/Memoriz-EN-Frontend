import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  questions: Array<Question>;
};

export type Question = {
  id: number;
  question: string;
  answer: string;
  grade: number;
  CorrectCountSum: number;
  InCorrectCountSum: number;
};

const initialState: { questions: Array<Question> } = {
  questions: [],
};

const questionListReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTION_LIST:
      return {
        questions: action.questions,
      };
  }
  return state;
};

export default questionListReducer;
