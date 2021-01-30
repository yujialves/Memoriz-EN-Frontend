import * as actionTypes from "./start.type";

type Action = {
  type: string;
  started: boolean;
  subjectId: number | null;
};

const initialState = {
  started: false,
  subjectId: null,
};

const startReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_STARTED:
      return {
        ...state,
        started: action.started,
        subjectId: action.subjectId,
      };
  }
  return state;
};

export default startReducer;
