import * as actionTypes from "./actionTypes";

export const setStarted = (started: boolean) => {
  return {
    type: actionTypes.SET_STARTED,
    started,
  };
};
