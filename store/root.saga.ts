import { all, takeLatest } from "redux-saga/effects";
import * as bingTypes from "../store/bing/bing.type";
import * as bingSagas from "../store/bing/bing.saga";

export default function* rootSaga() {
  yield all([
    takeLatest(bingTypes.LOAD_FROM_SERVER, bingSagas.loadFromServerSaga),
  ]);
}
