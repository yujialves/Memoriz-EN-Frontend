import { Question } from "../reducers/questionListReducer";
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseURL } from "../../secrets/constants";
import { Dispatch } from "redux";
import * as loadingsActions from "./loadings";

type ResponseData = {
  data: { questionList: Array<Question> };
};

export const fetchQuestionList = (subjectId: number, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingsActions.setFetchingQuestionList(true));
    const response: ResponseData = await axios.post(
      baseURL + "question/list",
      JSON.stringify({ subjectId }),
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response) {
      dispatch(loadingsActions.setFetchingQuestionList(false));
      dispatch(setQuestionList(response.data.questionList));
    }
  };
};

const setQuestionList = (questions: Array<Question>) => {
  return {
    type: actionTypes.SET_QUESTION_LIST,
    questions,
  };
};
