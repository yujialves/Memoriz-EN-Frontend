import * as actionTypes from "../actions/actionTypes";

export type Subjects = Array<{
  subject_id: number;
  name: string;
  grades: Array<{
    solvable: number;
    all: number;
  }>;
}>;

type Action = {
  type: string;
  subjects: Subjects;
};

const initialState: { subjects: Subjects } = {
  subjects: [],
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_SUBJECTS:
      return {
        subjects: action.subjects,
      };
  }
  return state;
};

export default subjectsReducer;
