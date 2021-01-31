import * as bingTypes from "./bing.type";

export const storeAudioInfo = (word: string, buffer: string) => {
  console.log('store', buffer);
  return {
    type: bingTypes.STORE_AUDIO_INFO,
    word,
    buffer,
  };
};

export const clearAudioInfo = () => {
  return {
    type: bingTypes.CLEAR_AUDIO_INFO,
  };
};

// Saga's Action

export const loadBingSource = (
  audioContext: AudioContext,
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void,
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void
) => {
  return {
    type: bingTypes.LOAD_BING_SOURCE,
    audioContext,
    setAudioBuffer,
    setFailedToLoad,
  };
};
