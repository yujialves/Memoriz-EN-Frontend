import * as actionTypes from "./actionTypes";

export const setStarted = (started: boolean, subjectId: number) => {
  return {
    type: actionTypes.SET_STARTED,
    started,
    subjectId,
  };
};
