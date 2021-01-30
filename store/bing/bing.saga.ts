import axios from "axios";
import { call, fork, put, select } from "redux-saga/effects";
import { baseURL } from "../../secrets/constants";
import { Question } from "../question/question.reducer";
import * as bingActions from "./bing.action";

type AudioInfo = {
  word: string;
  buffer: ArrayBuffer;
};

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

    // 初期化処理
    console.log("reqUpgradeEvent前");
    const reqUpgradeEvent = yield call(requestOnUpgradeNeeded, request);
    console.log("reqUpgradeEvent", reqUpgradeEvent);
    if (reqUpgradeEvent) {
      console.log("request.onupgradeneeded");

      const db: IDBDatabase = yield (<IDBRequest>reqUpgradeEvent.target).result;
      if (!db.objectStoreNames.contains("audioInfos")) {
        console.log("createstore");
        const store: IDBObjectStore = yield db.createObjectStore("audioInfos", {
          keyPath: "word",
        });
      }
    }

    // 接続成功時
    const reqSuccessEvent = yield call(requestOnSuccess, request);
    console.log("reqEvent", reqSuccessEvent);
    if (reqSuccessEvent) {
      try {
        console.log("request.onsuccess");
        const db: IDBDatabase = yield (<IDBRequest>reqSuccessEvent.target)
          .result;
        const trans: IDBTransaction = yield db.transaction(
          "audioInfos",
          "readwrite"
        );
        const store: IDBObjectStore = yield trans.objectStore("audioInfos");
        const getReq: IDBRequest<any> = yield store.get(word);

        // リクエスト成功したら
        const getReqSuccessEvent = yield call(getReqOnsuccess, getReq);
        if (getReqSuccessEvent) {
          console.log("getReq.onsuccess");
          const audioInfo = (yield (<IDBRequest>getReqSuccessEvent.target)
            .result) as AudioInfo | undefined;
          // 音声が保存されていなければ
          console.log(audioInfo);
          if (audioInfo == undefined) {
            // サーバからフェッチ
            yield put(
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
            yield put(
              bingActions.decodeAudioData(
                audioInfo.buffer,
                action.audioContext,
                action.setAudioBuffer,
                action.setFailedToLoad
              )
            );
          }
        }

        // エラーが起きたら
        const getReqErrerEvent = yield call(getReqOnerror, getReq);
        if (getReqErrerEvent) {
          console.log("getReq.onerror");
          // サーバからフェッチ
          yield put(
            bingActions.fetchBingSource(
              question.id,
              word,
              action.audioContext,
              action.setAudioBuffer,
              action.setFailedToLoad
            )
          );
        }

        const transCompleteEvent = yield call(transOnComplete, trans);
        if (transCompleteEvent) {
          console.log("トランザクション終了");
        }

        db.close();
        console.log("クローズ");
      } catch (err) {
        console.log(err);
        // objectStoreが作成されていなければ
        yield put(
          bingActions.fetchBingSource(
            question.id,
            word,
            action.audioContext,
            action.setAudioBuffer,
            action.setFailedToLoad
          )
        );
        console.log("putしたー");
      }
    }

    // 接続失敗時
    const reqErrorEvent = yield call(requestOnError, request);
    if (reqErrorEvent) {
      console.log(
        "Database error: " + (<IDBRequest>reqErrorEvent.target).error
      );
      yield put(
        bingActions.fetchBingSource(
          question.id,
          word,
          action.audioContext,
          action.setAudioBuffer,
          action.setFailedToLoad
        )
      );
    }
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

    // 接続成功時
    const reqSuccessEvent = yield call(requestOnSuccess, request);
    if (reqSuccessEvent) {
      console.log("request.onsuccess");
      const db: IDBDatabase = yield (<IDBRequest>reqSuccessEvent.target).result;
      const trans: IDBTransaction = yield db.transaction(
        "audioInfos",
        "readwrite"
      );
      const store: IDBObjectStore = yield trans.objectStore("audioInfos");
      const putReq: IDBRequest<IDBValidKey> = yield store.put({
        word: word,
        buffer: buffer,
      });

      const putReqSuccessEvent = yield call(putReqOnsuccess, putReq);
      if (putReqSuccessEvent) {
        console.log("保存成功");
      }

      const transCompleteEvent = yield call(transOnComplete, trans);
      if (transCompleteEvent) {
        console.log("トランザクション終了");
      }

      db.close();
    }

    // 接続失敗時
    const reqErrorEvent = yield call(requestOnError, request);
    if (reqErrorEvent) {
      console.log(
        "Database error: " + (<IDBRequest>reqErrorEvent.target).error
      );
    }
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

const requestOnSuccess = (request: IDBOpenDBRequest) => {
  return new Promise((resolve) => {
    request.onsuccess = resolve;
  });
};

const requestOnError = (request: IDBOpenDBRequest) => {
  return new Promise((resolve) => {
    request.onerror = resolve;
  });
};

const requestOnUpgradeNeeded = (request: IDBOpenDBRequest) => {
  return new Promise((resolve) => {
    request.onupgradeneeded = resolve;
  });
};

const getReqOnsuccess = (getReq: IDBRequest<any>) => {
  return new Promise((resolve) => {
    getReq.onsuccess = resolve;
  });
};

const getReqOnerror = (getReq: IDBRequest<any>) => {
  return new Promise((resolve) => {
    getReq.onerror = resolve;
  });
};

const putReqOnsuccess = (putReq: IDBRequest<IDBValidKey>) => {
  return new Promise((resolve) => {
    putReq.onsuccess = resolve;
  });
};

const transOnComplete = (trans: IDBTransaction) => {
  return new Promise((resolve) => {
    trans.oncomplete = resolve;
  });
};
