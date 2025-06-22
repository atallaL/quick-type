import './EndScreen.css'

import {useState, useEffect, useRef} from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';

import {playAudio} from '../../utils/soundPlayer'

export default function EndScreen({setGameState, stats}) {

    //choose a random word from this list to display
    const endWordList = ['great job!', 'incredible!', 'well done!', 'impressive!', 'amazing!', 'fantastic!', 'super!', 'awesome!', 'unreal!', 'good stuff!', 'nailed it!', 'mindblowing!', 'so quick!']
    const [endWord, setEndWord] = useState('');
    useEffect(() => {
        setEndWord(endWordList[Math.floor(Math.random() * endWordList.length)]);
    }, [])

    const endButtonsRef = useRef(null); //to make them uninteractable until thingy is done

    //on start, do little sounds on thingy appearing and remove animating class from thingy
    useEffect(() => {
        setTimeout(() => {
            endButtonsRef.current.classList.remove('hiding');
        }, 2500);
        setTimeout(() => {
            endButtonsRef.current.classList.remove('hiding');
        }, 2500);
        setTimeout(() => {
            endButtonsRef.current.classList.remove('hiding');
        }, 2500);
    }, []);

    //state switch handling
    const handleHomeSwitch = () => {
        playAudio('back');
        setGameState('home');
    }

    const handleGameSwitch = () => {
        playAudio('start');
        setGameState('game');
    }


    return (
        <div className="endContainer">
            <div className="endText">
                <div className="endHeader">
                    <h2>{endWord}</h2>
                </div>
                <div className="endStats">
                    <h3>stats:</h3>
                    <p>time elapsed: {stats.timeElapsed}s</p>
                    <p>words completed: {stats.wordsCompleted}</p>
                    <p>reaction time: {stats.wordsCompleted === 0 || stats.wordsCompleted === 1 ? 'N/A' : Math.floor(stats.timeFirstInputSum / (stats.wordsCompleted - 1)) + 'ms'}</p>
                </div>
            </div>
            <div className="endButtons hiding" ref={endButtonsRef}>
                <div className="endButton endHome" onClick={handleHomeSwitch}>
                    <p>home</p>
                </div>
                <div className="endButton endRetry" onClick={handleGameSwitch}>
                    <p>retry</p>
                    <i className="bi bi-caret-right-fill"></i>
                </div>
            </div>
        </div>
    );
}