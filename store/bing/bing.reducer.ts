import * as bingTypes from "./bing.type";

export type AudioInfo = {
  word: string;
  buffer: ArrayBuffer;
};

type Action = {
  type: string;
  audioInfos: AudioInfo[];
  // 以下二つはAudioInfo[]に格納するための一時的なやつ
  word: string;
  buffer: ArrayBuffer;
};

const initialState = {
  audio: [],
};

const subjectsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case bingTypes.STORE_AUDIO_INFO:
      return {
        audioInfos: action.audioInfos.concat({
          word: action.word,
          buffer: action.buffer,
        }),
        ...state,
      };
  }
  return state;
};

export default subjectsReducer;
