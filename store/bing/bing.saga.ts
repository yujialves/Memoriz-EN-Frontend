import axios from "axios";
import { call, fork, put, select, take } from "redux-saga/effects";
import { baseURL } from "../../secrets/constants";
import { Question } from "../question/question.reducer";
import { channel } from "redux-saga";
import * as bingActions from "./bing.action";

type AudioInfo = {
  word: string;
  buffer: ArrayBuffer;
};

const fetchChannel = channel();
const decodeChannel = channel();

export function* loadBingSourceSaga(action: {
  type: string;
  audioContext: AudioContext;
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void;
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void;
}) {
  console.log("loadBingSourceSaga");
  // ロード失敗を初期化
  yield action.setFailedToLoad(false);

  const question: Question = yield select(
    (state: { question: Question }) => state.question
  );
  const word = /[ぁ-んァ-ン一-龥]/.test(question.question)
    ? question.answer
    : question.question;

  // 音声が保存されているかを確認
  const db: IDBFactory = yield window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  if (!db) {
    console.log("indexedDBがサポートされていません");
    yield action.setFailedToLoad(true);
  } else {
    console.log("request");
    const request: IDBOpenDBRequest = yield db.open("memoriz-en", 1);

    // 接続成功時
    yield (request.onsuccess = (event) => {
      try {
        console.log("request.onsuccess");
        const db: IDBDatabase = (<IDBRequest>event.target).result;
        console.log(db);
        const trans = db.transaction("audioInfos", "readwrite");
        console.log(trans);
        const store = trans.objectStore("audioInfos");
        console.log(store);
        const getReq = store.get(word);
        console.log(getReq);

        // リクエスト成功したら
        getReq.onsuccess = (event) => {
          console.log("getReq.onsuccess");
          const audioInfo = (<IDBRequest>event.target).result as
            | AudioInfo
            | undefined;
          // 音声が保存されていなければ
          console.log(audioInfo);
          if (audioInfo == undefined) {
            // サーバからフェッチ
            fetchChannel.put(
              bingActions.fetchBingSource(
                question.id,
                word,
                action.audioContext,
                action.setAudioBuffer,
                action.setFailedToLoad
              )
            );
          } else {
            // デコード
            decodeChannel.put(
              bingActions.decodeAudioData(
                audioInfo.buffer,
                action.audioContext,
                action.setAudioBuffer,
                action.setFailedToLoad
              )
            );
          }
        };

        // エラーが起きたら
        getReq.onerror = () => {
          console.log("getReq.onerror");
          // サーバからフェッチ
          fetchChannel.put(
            bingActions.fetchBingSource(
              question.id,
              word,
              action.audioContext,
              action.setAudioBuffer,
              action.setFailedToLoad
            )
          );
        };

        trans.oncomplete = () => {
          console.log("トランザクション終了");
        };

        db.close();
        console.log("クローズ");
      } catch (err) {
        console.log(err);
        // objectStoreが作成されていなければ
        fetchChannel.put(
          bingActions.fetchBingSource(
            question.id,
            word,
            action.audioContext,
            action.setAudioBuffer,
            action.setFailedToLoad
          )
        );
      }
    });

    // 接続失敗時
    yield (request.onerror = (event) => {
      console.log("Database error: " + (<IDBRequest>event.target).error);
      fetchChannel.put(
        bingActions.fetchBingSource(
          question.id,
          word,
          action.audioContext,
          action.setAudioBuffer,
          action.setFailedToLoad
        )
      );
    });
  }
}

export function* fetchBingSourceSaga(action: {
  type: string;
  id: number;
  word: string;
  audioContext: AudioContext;
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void;
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void;
}) {
  const token: string = yield select(
    (state: { auth: { token: string } }) => state.auth.token
  );
  console.log("fetchBingSourceSaga");

  const { status, data } = yield call(() =>
    axios
      .post(
        baseURL + "question/bing",
        {
          id: action.id,
          word: action.word,
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
  console.log(status, data);
  if (status === 200) {
    const buffer: ArrayBuffer = data;
    // 音声を保存
    yield fork(storeAudioInfo, action.word, buffer);
    // デコード
    yield put(
      bingActions.decodeAudioData(
        buffer,
        action.audioContext,
        action.setAudioBuffer,
        action.setFailedToLoad
      )
    );
  } else {
    yield action.setFailedToLoad(true);
  }
}

export function* decodeAudioDataSaga(action: {
  type: string;
  buffer: ArrayBuffer;
  audioContext: AudioContext;
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void;
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void;
}) {
  console.log("decode");
  console.log(action.buffer);
  try {
    action.audioContext.decodeAudioData(
      action.buffer,
      (buffer) => {
        action.setAudioBuffer(buffer);
      },
      () => {
        action.setFailedToLoad(true);
      }
    );
  } catch (err) {
    yield action.setFailedToLoad(true);
  }
}

function* storeAudioInfo(word: string, buffer: ArrayBuffer) {
  console.log("storeAudioInfo");
  const db: IDBFactory = yield window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  if (!db) {
    console.log("indexedDBがサポートされていません");
  } else {
    console.log("request");
    const request: IDBOpenDBRequest = yield db.open("memoriz-en", 1);

    // 初期化処理
    request.onupgradeneeded = (event) => {
      console.log("request.onupgradeneeded");

      const db: IDBDatabase = (<IDBRequest>event.target).result;
      if (!db.objectStoreNames.contains("audioInfos")) {
        console.log("createstore");
        const store: IDBObjectStore = db.createObjectStore("audioInfos", {
          keyPath: "word",
        });
      }
    };

    // 接続成功時
    request.onsuccess = (event) => {
      console.log("request.onsuccess");
      const db: IDBDatabase = (<IDBRequest>event.target).result;
      const trans = db.transaction("audioInfos", "readwrite");
      const store = trans.objectStore("audioInfos");
      const putReq = store.put({ word: word, buffer: buffer });

      putReq.onsuccess = () => {
        console.log("保存成功");
      };

      trans.oncomplete = () => {
        console.log("トランザクション終了");
      };

      db.close();
    };

    // 接続失敗時
    request.onerror = (event) => {
      console.log("Database error: " + (<IDBRequest>event.target).error);
    };
  }
}

export function* clearAudioInfosSaga() {
  console.log("clearAudioInfo");
  const db: IDBFactory = yield window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  if (!db) {
    console.log("indexedDBがサポートされていません");
  } else {
    console.log("request");
    const request: IDBOpenDBRequest = yield db.open("memoriz-en", 1);

    // 接続成功時
    request.onsuccess = (event) => {
      console.log("request.onsuccess");
      const db: IDBDatabase = (<IDBRequest>event.target).result;
      if (!db.objectStoreNames.contains("audioInfos")) {
        db.deleteObjectStore("audioInfos");
      }
      db.close();
    };

    // 接続失敗時
    request.onerror = (event) => {
      console.log("Database error: " + (<IDBRequest>event.target).error);
    };
  }
}

export function* watchFetchChannel() {
  while (true) {
    const action = yield take(fetchChannel);
    yield put(action);
  }
}

export function* watchDecodeChannel() {
  while (true) {
    const action = yield take(decodeChannel);
    yield put(action);
  }
}
