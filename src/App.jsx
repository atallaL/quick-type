import {useState, useEffect} from 'react'
import 'react-router-dom'

import './App.css'

import Topbar from './components/topbar/Topbar'
import HomeScreen from './components/homescreen/HomeScreen'
import GameScreen from './components/gamescreen/GameScreen'
import EndScreen from './components/endscreen/EndScreen'
import BottomInfo from './components/bottominfo/BottomInfo'

import hover from './soundeffect/hover.ogg'
import {enableAudio, playAudio} from './utils/soundPlayer'

function App() {

  //states
  const [lightmode, setLightmode] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const [gameState, setGameState] = useState("home");
  const [difficulty, setDifficulty] = useState('easy');

  //stats to pass from game to end stats component
  const [stats, setStats] = useState(null);

  //state handlers
  const handleModeSwitch = () => {
    setLightmode(prev => !prev);
  };

  const handleAudioToggle = () => {
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
        playAudio(hover, 0.2);
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
