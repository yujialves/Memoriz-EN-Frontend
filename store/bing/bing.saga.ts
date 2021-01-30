import axios, { AxiosResponse } from "axios";
import { call, select } from "redux-saga/effects";
import { baseURL } from "../../secrets/constants";
import { Question } from "../question/question.reducer";

export function* loadFromServerSaga(action: {
  type: string;
  audioContext: AudioContext;
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void;
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void;
}) {
  yield action.setFailedToLoad(false);
  const question = yield select(
    (state: { question: Question }) => state.question
  );
  const token = yield select(
    (state: { auth: { token: string } }) => state.auth.token
  );
  const { status, data } = yield call(() =>
    axios
      .post(
        baseURL + "question/bing",
        JSON.stringify({
          word: /[ぁ-んァ-ン一-龥]/.test(question.question)
            ? question.answer
            : question.question,
        }),
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
    try {
      const buffer: ArrayBuffer = data;
      action.audioContext.decodeAudioData(
        buffer,
        (buffer) => {
          action.setAudioBuffer(buffer);
        },
        () => {
          action.setFailedToLoad(true);
        }
      );
    } catch {
      yield action.setFailedToLoad(true);
    }
  } else {
    yield action.setFailedToLoad(true);
  }
}
