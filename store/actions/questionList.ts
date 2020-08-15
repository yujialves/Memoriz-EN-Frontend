import { Question } from "../reducers/questionListReducer";
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseURL } from "../../secrets/constants";
import { Dispatch } from "redux";
import * as loadingsActions from "./loadings";

type ResponseData = {
  data: { questionList: Question[] };
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

export const reorder = (
  questionList: Question[],
  order: "id" | "alphabet" | "grade",
  reversed: boolean
) => {
  return async (dispatch: Dispatch) => {
    let newQuestionList: Question[];
    switch (order) {
      case "id":
        if (!reversed) {
          newQuestionList = questionList.sort((a, b) => a.id - b.id);
        } else {
          newQuestionList = questionList.sort((a, b) => b.id - a.id);
        }
        break;
      case "alphabet":
        if (!reversed) {
          newQuestionList = questionList.sort((a, b) =>
            a.question.toLowerCase() < b.question.toLowerCase() ? -1 : 1
          );
        } else {
          newQuestionList = questionList.sort((a, b) =>
            a.question.toLowerCase() > b.question.toLowerCase() ? -1 : 1
          );
        }
        break;
      case "grade":
        if (!reversed) {
          newQuestionList = questionList.sort((a, b) => a.grade - b.grade);
        } else {
          newQuestionList = questionList.sort((a, b) => b.grade - a.grade);
        }
        break;
    }
    console.log(newQuestionList);
    dispatch(setQuestionList(newQuestionList));
  };
};

const setQuestionList = (questionList: Array<Question>) => {
  return {
    type: actionTypes.SET_QUESTION_LIST,
    questionList,
  };
};
