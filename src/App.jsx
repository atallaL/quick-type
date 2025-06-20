import {useState, useEffect} from 'react'
import './App.css'

import Topbar from './components/topbar/Topbar'
import HomeScreen from './components/homescreen/HomeScreen'

function App() {

  //states
  const [lightmode, setLightmode] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const [gameState, setGameState] = useState("home");

  const handleModeSwitch = () => {
    setLightmode(prev => !prev);
  };

  const handleAudioToggle = () => {
    setAudioEnabled(prev => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', !lightmode);
  }, [lightmode]);

  return (
    <>
      <div className="mainContainer">
        <Topbar lightmode={lightmode} switchMode={handleModeSwitch} audioEnabled={audioEnabled} toggleAudio={handleAudioToggle} />

        {/* game states, put component on screen based on state of game */}
        {gameState === "home" && <HomeScreen setGameState={setGameState} lightmode={lightmode} />}
      </div>
    </>
  );  
}

export default App
