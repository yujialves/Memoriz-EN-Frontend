import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseURL } from "../../secrets/constants";
import { Dispatch } from "redux";
import { Question } from "../reducers/questionReducer";
import * as loadingsActions from "./loadings";

type Response = {
  status: number;
  data: { question: Question; rest: number };
};

export const inCorrectAnwer = (
  questionId: number,
  subjectId: number,
  token: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingsActions.setLoadingQuestion(true));
    // レスポンスとして新しい問題を得る
    const response: Response = await axios.post(
      baseURL + "question/incorrect",
      JSON.stringify({ questionId, subjectId }),
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch(loadingsActions.setLoadingQuestion(false));
    return dispatch(
      setQuestion({
        id: response.data.question.id,
        question: response.data.question.question,
        answer: response.data.question.answer,
        grade: response.data.question.grade,
        rest: response.data.rest,
      })
    );
  };
};

export const correctAnwer = (
  questionId: number,
  subjectId: number,
  token: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingsActions.setLoadingQuestion(true));
    // レスポンスとして新しい問題を得る
    const response: Response = await axios.post(
      baseURL + "question/correct",
      JSON.stringify({ questionId, subjectId }),
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch(loadingsActions.setLoadingQuestion(false));
    return dispatch(
      setQuestion({
        id: response.data.question.id,
        question: response.data.question.question,
        answer: response.data.question.answer,
        grade: response.data.question.grade,
        rest: response.data.rest,
      })
    );
  };
};

export const getQuestion = (subjectId: number, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingsActions.setLoadingQuestion(true));
    const response: Response = await axios.post(
      baseURL + "question",
      JSON.stringify({ subjectId }),
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch(loadingsActions.setLoadingQuestion(false));
    return dispatch(
      setQuestion({
        id: response.data.question.id,
        question: response.data.question.question,
        answer: response.data.question.answer,
        grade: response.data.question.grade,
        rest: response.data.rest,
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
    rest: question.rest,
  };
};
