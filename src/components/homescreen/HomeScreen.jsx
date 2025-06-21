import './HomeScreen.css'

import logo from '../../assets/logo.png'
import logoDark from '../../assets/logo_dark.png'
import 'bootstrap-icons/font/bootstrap-icons.css'

//sound effects
import openSFX from '../../soundeffect/howplayopen.ogg'
import startSFX from '../../soundeffect/start.ogg'
import clickSFX from '../../soundeffect/hover.ogg'
import {playAudio} from '../../utils/soundPlayer'

export default function HomeScreen({setGameState, lightmode, difficulty, setDifficulty}) {
    

    //to allow playing sound and selecting level
    const handleDifficultySelection = (difficultyLevel) => {
        setDifficulty(difficultyLevel);

        //play audio
        playAudio(clickSFX, 0.3);
    }

    const handleGameStateSwitch = () => {
        //play audio
        playAudio(startSFX, 0.3);
        setGameState('game');
    }

    const handleHowToPlay = () => {
        //play audio
        playAudio(openSFX);
    }
    
    return (
        <div className="homeContainer">
            <div className="homeCenter">
                <div className="logoContainer">
                    <img src={lightmode ? logo : logoDark} />
                </div>
                <div className="homeStart">
                    <div className="startButton" onClick={() => handleGameStateSwitch()}>
                        <h2>start</h2>
                        <i className="bi bi-caret-right-fill"></i>
                    </div>
                    <div className="homeHow">
                        <p onClick={handleHowToPlay}>how do i play?</p>
                    </div>
                </div>
            </div>
            <div className="homeBottom">
                <div className="difficultyContainer">
                    <div 
                        className={`difficultyOption ${difficulty === 'easy' ? 'active' : ''}`}
                        onClick={() => handleDifficultySelection('easy')}    
                    >easy</div>
                    <div 
                        className={`difficultyOption ${difficulty === 'medium' ? 'active' : ''}`}
                        onClick={() => handleDifficultySelection('medium')}    
                    >medium</div>
                    <div 
                        className={`difficultyOption ${difficulty === 'hard' ? 'active' : ''}`}
                        onClick={() => handleDifficultySelection('hard')}    
                    >hard</div>
                </div>
            </div>

        </div>
    );
}