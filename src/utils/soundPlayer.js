//so audio can be disabled globally instead of per component

let audioEnabled = true;

export const enableAudio = (set) => {
  audioEnabled = set;
};

export const playAudio = (sound, volume=1) => {
  if (!audioEnabled) {
    return;
  };
  
  const audio = new Audio(sound);
  audio.volume = volume;
  audio.play();
};