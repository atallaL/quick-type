import { useState } from 'react'
import './App.css'

import HomeScreen from './components/homescreen/HomeScreen'

function App() {

  const [gameState, setGameState] = useState("home");

  return (
    <>

      <div className="mainContainer">
        {gameState === "home" && <HomeScreen setGameState={setGameState}/>}
      </div>
    </>
  )  
}

export default App
