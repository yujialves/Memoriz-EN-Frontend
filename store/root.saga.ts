import { all, fork, takeLatest } from "redux-saga/effects";
import * as bingTypes from "../store/bing/bing.type";
import * as bingSagas from "../store/bing/bing.saga";

export default function* rootSaga() {
  yield all([
    takeLatest(bingTypes.LOAD_BING_SOURCE, bingSagas.loadBingSourceSaga),
    takeLatest(bingTypes.FETCH_BING_SOURCE, bingSagas.fetchBingSourceSaga),
    takeLatest(bingTypes.DECODE_AUDIO_DATA, bingSagas.decodeAudioDataSaga),
    takeLatest(bingTypes.WATCH_FETCH_CHANNEL, bingSagas.watchFetchChannelSaga),
    takeLatest(
      bingTypes.WATCH_DECODE_CHANNEL,
      bingSagas.watchDecodeChannelSaga
    ),
  ]);
}
