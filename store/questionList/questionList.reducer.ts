import * as actionTypes from "./questionList.type";

type Action = {
  type: string;
  questionList: Question[];
};

export type Question = {
  id: number;
  question: string;
  answer: string;
  grade: number;
  correctCountSum: number;
  inCorrectCountSum: number;
};

const initialState: { questionList: Question[] } = {
  questionList: [],
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
