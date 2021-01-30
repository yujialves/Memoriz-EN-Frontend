import * as bingTypes from "./bing.type";

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

export const fetchBingSource = (
  id: number,
  word: string,
  audioContext: AudioContext,
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void,
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void
) => {
  return {
    type: bingTypes.FETCH_BING_SOURCE,
    id,
    word,
    audioContext,
    setAudioBuffer,
    setFailedToLoad,
  };
};

export const decodeAudioData = (
  buffer: ArrayBuffer,
  audioContext: AudioContext,
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void,
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void
) => {
  return {
    type: bingTypes.DECODE_AUDIO_DATA,
    buffer,
    audioContext,
    setAudioBuffer,
    setFailedToLoad,
  };
};

export const clearAudioInfos = () => {
  return {
    type: bingTypes.CLEAR_AUDIO_INFOS,
  };
};

export function watchFetchChannel() {
  return {
    type: bingTypes.WATCH_FETCH_CHANNEL,
  };
}

export function watchDecodeChannel() {
  return {
    type: bingTypes.WATCH_DECODE_CHANNEL,
  };
}
