import * as actionTypes from "./subjects.type";
import axios from "axios";
import { baseURL } from "../../secrets/constants";
import { Subjects } from "./subjects.reducer";
import { Dispatch } from "redux";

type Response = {
  status: number;
  data: { subjects: Subjects; exp: number };
};

export const getSubjects = (token: string) => {
  return async (dispatch: Dispatch) => {
    const response: Response = await axios.get(baseURL + "subjects", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return dispatch(setSubjects(response.data.subjects, response.data.exp));
  };
};

const setSubjects = (subjects: Subjects, exp: number) => {
  return {
    type: actionTypes.SET_SUBJECTS,
    subjects,
    exp,
  };
};
