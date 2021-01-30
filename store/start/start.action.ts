import * as actionTypes from "./start.type";

export const setStarted = (started: boolean, subjectId: number) => {
  return {
    type: actionTypes.SET_STARTED,
    started,
    subjectId,
  };
};
