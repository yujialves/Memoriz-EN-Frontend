import * as bingTypes from "./bing.type";

type AudioInfo = {
  word: string;
  buffer: ArrayBuffer;
};

type Action = {
  type: string;
  audioInfo: AudioInfo[];
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
        audioInfo: action.audioInfo.concat({
          word: action.word,
          buffer: action.buffer,
        }),
        ...state,
      };
  }
  return state;
};

export default subjectsReducer;
