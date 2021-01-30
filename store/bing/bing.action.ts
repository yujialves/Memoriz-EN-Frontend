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

export const clearAudioInfos = () => {
  return {
    type: bingTypes.CLEAR_AUDIO_INFOS,
  };
};
