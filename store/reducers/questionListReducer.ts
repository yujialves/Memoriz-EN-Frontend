import * as actionTypes from "../actions/actionTypes";

type Action = {
  type: string;
  questionList: Array<Question>;
};

export type Question = {
  id: number;
  question: string;
  answer: string;
  grade: number;
  correctCountSum: number;
  inCorrectCountSum: number;
};

const initialState: { questions: Array<Question> } = {
  questions: [],
};

const questionListReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTION_LIST:
      return {
        questionList: action.questionList,
      };
  }
  return state;
};

export default questionListReducer;
