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
  buffer: ArrayBuffer | null;
};

const initialState = {
  audioInfos: [],
  word: "",
  buffer: null,
};

const bingReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case bingTypes.STORE_AUDIO_INFO:
      const audioInfos = [...state.audioInfos] as AudioInfo[];
      console.log(audioInfos);
      return {
        ...state,
        audioInfos: audioInfos.concat({
          word: action.word,
          buffer: action.buffer as ArrayBuffer,
        }),
      };
    case bingTypes.CLEAR_AUDIO_INFO:
      return {
        ...state,
        audioInfos: [],
        word: "",
        buffer: null,
      };
  }
  return state;
};

export default bingReducer;
