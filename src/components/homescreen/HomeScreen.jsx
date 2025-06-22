import './HomeScreen.css'

import logo from '../../assets/logo.png'
import logoDark from '../../assets/logo_dark.png'
import 'bootstrap-icons/font/bootstrap-icons.css'

import {useState} from 'react';

//sound effects
import {playAudio} from '../../utils/soundPlayer'

export default function HomeScreen({setGameState, lightmode, difficulty, setDifficulty}) {
    const [displayInstructions, setDisplayInstructions] = useState(false); //how to play
    
    //to allow playing sound and selecting level
    const handleDifficultySelection = (difficultyLevel) => {
        setDifficulty(difficultyLevel);

        //play audio
        playAudio('hover');
    }

    const handleGameStateSwitch = () => {
        //play audio
        playAudio('start');
        setGameState('game');
    }

    const handleHowToPlay = () => {
        //play audio
        playAudio('howplay');
        setDisplayInstructions(true);
    }

    const handleHowToPlayClose = () => {
        //play audio
        playAudio('closehowplay');
        setDisplayInstructions(false);
    }
    
    return (
        <>
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
            {/* popup for instruction on how to play */}
            {displayInstructions && 
                <div className="instructionOverlay">
                    <div className="instructionContainer">
                        <div className="instructionHeader">
                            <h3>how to play</h3>
                        </div>
                        <div className="instructionBody">
                            <div className="instructionText">
                                <p>press <strong>start</strong> to begin playing!</p>
                                <ul>
                                    <li>choose the difficulty you would like to play</li>
                                    <li>type the word on screen as <strong>fast</strong> as you can</li>
                                    <li>the timer shrinks while you type</li>
                                    <li>if the timer runs out, that's <strong>game over</strong></li>
                                </ul>
                            </div>
                            <div className="instructionExamples">
                                <p>examples</p>
                                <div className="animatedExamples">
                                    <div className="example incomplete">
                                        <span>c</span>
                                        <p>incomplete</p>
                                    </div>
                                    <div className="example correct">
                                        <span>a</span>
                                        <p>correct input</p>
                                    </div>
                                    <div className="example wrong">
                                        <span>r</span>
                                        <p>wrong input</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="instructionOut" onClick={() => handleHowToPlayClose()}>
                            <p>got it!</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}