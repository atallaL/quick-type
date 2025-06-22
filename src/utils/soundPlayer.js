//so audio can be disabled globally instead of per component
//we also preload our audio into a cache so we dont have to go collect and load it everytime, improves performance especially on mobile

let audioEnabled = true;
const cache = new Map(); //holds all possible audio

export const enableAudio = (set) => {
  audioEnabled = set;
};

//preload audio by creating the audio object with a key and placing it in cache
export const preloadAudio = (key, path, volume=1) => {
  const audio = new Audio(path);
  audio.volume=volume;
  audio.preload='auto'; //preload
  cache.set(key, {audio, volume})
}

export const playAudio = (key) => {
  if (!audioEnabled) {
    return;
  };

  const {audio: ogAudio, volume} = cache.get(key); // grab audio, volume pair
  const audio = ogAudio.cloneNode(); //clone audio so they can overlap
  audio.volume = volume;
  audio.play();
};