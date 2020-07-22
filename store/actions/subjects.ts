import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseURL } from "../../secrets/constants";
import { Subjects } from "../reducers/subjectsReducer";
import { Dispatch } from "redux";

type Response = {
  status: number;
  data: { subjects: Subjects };
};

export const getSubjects = () => {
  return async (dispatch: Dispatch) => {
    const response: Response = await axios.get(baseURL + "subjects");
    return dispatch(setSubjects(response.data.subjects));
  };
};

const setSubjects = (subjects: Subjects) => {
  return {
    type: actionTypes.SET_SUBJECTS,
    subjects,
  };
};
