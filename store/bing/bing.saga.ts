import axios from "axios";
import { call, fork, put, select } from "redux-saga/effects";
import { baseURL } from "../../secrets/constants";
import { Question } from "../question/question.reducer";
import { AudioInfo } from "./bing.reducer";
import * as bingAction from "./bing.action";

export function* loadBingSourceSaga(action: {
  type: string;
  audioContext: AudioContext;
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void;
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void;
}) {
  console.log("load");
  // ロード失敗を初期化
  yield action.setFailedToLoad(false);

  const question: Question = yield select(
    (state: { question: Question }) => state.question
  );
  const word = /[ぁ-んァ-ン一-龥]/.test(question.question)
    ? question.answer
    : question.question;

  // メモリーにaudioが保存されているかを確認
  const audioInfos: AudioInfo[] = yield select(
    (state: { bing: { audioInfos: AudioInfo[] } }) => state.bing.audioInfos
  );
  const matchedAudioInfos = audioInfos.filter((value) => {
    return value.word === word;
  });
  // 保存されていれば
  if (matchedAudioInfos.length > 0) {
    // デコード
    yield fork(
      decodeAudioData,
      JSON.parse(matchedAudioInfos[0].buffer),
      action.audioContext,
      action.setAudioBuffer,
      action.setFailedToLoad
    );
  } else {
    // 保存されていなければサーバーからフェッチ
    yield fork(
      fetchBingSourceSaga,
      question.id,
      word,
      action.audioContext,
      action.setAudioBuffer,
      action.setFailedToLoad
    );
  }
}

function* fetchBingSourceSaga(
  id: number,
  word: string,
  audioContext: AudioContext,
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void,
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void
) {
  console.log("fetch");
  const token: string = yield select(
    (state: { auth: { token: string } }) => state.auth.token
  );

  const { status, data } = yield call(() =>
    axios
      .post(
        baseURL + "question/bing",
        {
          id,
          word,
        },
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const status = res.status;
        const data = res.data;
        return { status, data };
      })
      .catch((error) => {
        const status = error.response.status;
        const data = error.response.data;
        return { status, data };
      })
  );
  if (status === 200) {
    const buffer: ArrayBuffer = data;
    // 音声をメモリに保存
    console.log("data", data);
    console.log("fetch1", buffer);
    yield put(bingAction.storeAudioInfo(word, JSON.stringify(buffer)));
    // デコード
    console.log("fetch2", buffer);
    yield fork(
      decodeAudioData,
      buffer,
      audioContext,
      setAudioBuffer,
      setFailedToLoad
    );
  } else {
    yield setFailedToLoad(true);
  }
}

function* decodeAudioData(
  buffer: ArrayBuffer,
  audioContext: AudioContext,
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void,
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void
) {
  console.log("decode");
  console.log("deode", buffer);
  try {
    audioContext.decodeAudioData(
      buffer,
      (buffer) => {
        setAudioBuffer(buffer);
      },
      () => {
        setFailedToLoad(true);
      }
    );
  } catch (err) {
    console.log(err);
    yield setFailedToLoad(true);
  }
}
