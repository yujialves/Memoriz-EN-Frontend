import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseURL } from "../../secrets/constants";
import { Dispatch } from "redux";
import { Question } from "../reducers/questionReducer";

type Response = {
  status: number;
  data: { question: Question };
};

export const inCorrectAnwer = (questionId: number, subjectId: number) => {
  return async (dispatch: Dispatch) => {
    // レスポンスとして新しい問題を得る
    const response: Response = await axios.post(
      baseURL + "question/incorrect",
      JSON.stringify({ questionId, subjectId })
    );
    return dispatch(
      setQuestion({
        id: response.data.question.id,
        question: response.data.question.question,
        answer: response.data.question.answer,
        grade: response.data.question.grade,
      })
    );
  };
};

export const correctAnwer = (questionId: number, subjectId: number) => {
  return async (dispatch: Dispatch) => {
    // レスポンスとして新しい問題を得る
    const response: Response = await axios.post(
      baseURL + "question/correct",
      JSON.stringify({ questionId, subjectId })
    );
    return dispatch(
      setQuestion({
        id: response.data.question.id,
        question: response.data.question.question,
        answer: response.data.question.answer,
        grade: response.data.question.grade,
      })
    );
  };
};

export const getQuestion = (subjectId: number) => {
  return async (dispatch: Dispatch) => {
    const response: Response = await axios.post(
      baseURL + "question",
      JSON.stringify({ subjectId })
    );
    return dispatch(
      setQuestion({
        id: response.data.question.id,
        question: response.data.question.question,
        answer: response.data.question.answer,
        grade: response.data.question.grade,
      })
    );
  };
};

export const setQuestion = (question: Question) => {
  return {
    type: actionTypes.SET_QUESTION,
    id: question.id,
    question: question.question,
    answer: question.answer,
    grade: question.grade,
  };
};
