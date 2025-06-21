import {useState, useEffect} from 'react'
import 'react-router-dom'

import './App.css'

import Topbar from './components/topbar/Topbar'
import HomeScreen from './components/homescreen/HomeScreen'
import GameScreen from './components/gamescreen/GameScreen'
import EndScreen from './components/endscreen/EndScreen'
import BottomInfo from './components/bottominfo/BottomInfo'

import hover from './soundeffect/hover.mp3'
import back from './soundeffect/backHome.mp3'
import died from './soundeffect/died.mp3'
import howPlay from './soundeffect/howplayopen.mp3'
import start from './soundeffect/start.mp3'
import correct from './soundeffect/typeCorrect.mp3'
import incorrect from './soundeffect/typeIncorrect.mp3'
import complete from './soundeffect/wordComplete.mp3'
import {enableAudio, playAudio, preloadAudio} from './utils/soundPlayer'

//check if we on mobile, for audio playing
import {isMobile} from './utils/isMobile'

function App() {

  //preload all sounds 
  useEffect(() => {
    preloadAudio('hover', hover, 0.3);
    preloadAudio('back', back, 0.3);
    preloadAudio('died', died, 0.2);
    preloadAudio('howplay', howPlay, 0.3);
    preloadAudio('start', start, 0.3);
    preloadAudio('correct', correct);
    preloadAudio('incorrect', incorrect, 0.5);
    preloadAudio('complete', complete, 0.3);
  }, []);

  //states
  const [lightmode, setLightmode] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(!isMobile());

  const [gameState, setGameState] = useState("home");
  const [difficulty, setDifficulty] = useState('easy');

  //stats to pass from game to end stats component
  const [stats, setStats] = useState(null);

  //state handlers
  const handleModeSwitch = () => {
    setLightmode(prev => !prev);
  };

  const handleAudioToggle = () => {
    if (isMobile()) {return};
    setAudioEnabled(prev => !prev);
  };

  //switch mode
  useEffect(() => {
    document.body.classList.toggle('dark', !lightmode);
  }, [lightmode]);

  //handle audio
  useEffect(() => {
    enableAudio(audioEnabled);
  }, [audioEnabled]);

  //when hovering things, play a sound
  useEffect(() => {
    const handleHoverSound = (e) => {
      const target = e.target.closest('.clickable');
      if (target) { //if hovering a clickable element
        playAudio('hover');
      }
    };

    document.addEventListener('mouseover', handleHoverSound);

    return () => {
      document.removeEventListener('mouseover', handleHoverSound);
    };
  }, []);

  return (
    <>
      <div className="mainContainer">
        <Topbar lightmode={lightmode} switchMode={handleModeSwitch} audioEnabled={audioEnabled} toggleAudio={handleAudioToggle} />

        {/* game states, put component on screen based on state of game */}
        {gameState === "home" && <HomeScreen setGameState={setGameState} lightmode={lightmode} difficulty={difficulty} setDifficulty={setDifficulty} />}
        {gameState === "game" && <GameScreen difficulty={difficulty} setGameState={setGameState} setStats={setStats}/>}
        {gameState === "end" && <EndScreen setGameState={setGameState} stats={stats}/>}

        <BottomInfo />
      </div>
    </>
  );  
}

export default App
