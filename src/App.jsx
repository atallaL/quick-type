import {useState, useEffect} from 'react'
import 'react-router-dom'

import './App.css'

import Topbar from './components/topbar/Topbar'
import HomeScreen from './components/homescreen/HomeScreen'
import BottomInfo from './components/bottominfo/BottomInfo'

import {enableAudio} from './utils/soundPlayer'

function App() {

  //states
  const [lightmode, setLightmode] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const [gameState, setGameState] = useState("home");
  const [difficulty, setDifficulty] = useState('easy');

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

  return (
    <>
      <div className="mainContainer">
        <Topbar lightmode={lightmode} switchMode={handleModeSwitch} audioEnabled={audioEnabled} toggleAudio={handleAudioToggle} />

        {/* game states, put component on screen based on state of game */}
        {gameState === "home" && <HomeScreen setGameState={setGameState} lightmode={lightmode} difficulty={difficulty} setDifficulty={setDifficulty} />}

        <BottomInfo />
      </div>
    </>
  );  
}

export default App
