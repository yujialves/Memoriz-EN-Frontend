import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseURL } from "../../secrets/constants";
import { Dispatch } from "redux";
import { Question } from "../reducers/questionReducer";

type Response = {
  status: number;
  data: { question: Question };
};

export const getSubjects = (subject_id: number) => {
  return async (dispatch: Dispatch) => {
    const response: Response = await axios.post(baseURL + "question", {
      subject_id,
    });
    return dispatch(
      setQuestion({
        question: response.data.question.question,
        answer: response.data.question.answer,
      })
    );
  };
};

const setQuestion = (question: Question) => {
  return {
    type: actionTypes.SET_QUESTION,
    question: question.question,
    answer: question.answer,
  };
};
