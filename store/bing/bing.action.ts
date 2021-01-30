import * as bingTypes from "./bing.type";

export const loadFromServer = (
  audioContext: AudioContext,
  setAudioBuffer: (value: React.SetStateAction<AudioBuffer | null>) => void,
  setFailedToLoad: (value: React.SetStateAction<boolean>) => void
) => {
  return {
    type: bingTypes.LOAD_FROM_SERVER,
    audioContext,
    setAudioBuffer,
    setFailedToLoad,
  };
};
