import * as actionTypes from "./subjects.type";

export type Subjects = Array<{
  subjectId: number;
  name: string;
  grades: Grades;
  correctCount: number;
  inCorrectCount: number;
  totalCorrectCount: number;
  totalInCorrectCount: number;
}>;

export type Grades = Array<{
  solvable: number;
  all: number;
}>;

type Action = {
  type: string;
  subjects: Subjects;
  exp: number;
};

const initialState: { subjects: Subjects; exp: number } = {
  subjects: [],
  exp: 0,
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_SUBJECTS:
      return {
        ...state,
        subjects: action.subjects,
        exp: action.exp,
      };
  }
  return state;
};

export default subjectsReducer;
