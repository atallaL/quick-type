import './EndScreen.css'

import {useState, useEffect} from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';

import {playAudio} from '../../utils/soundPlayer'

export default function EndScreen({stats}) {

    const endWordList = ['great job!', 'incredible!', 'well done!', 'impressive!', 'amazing!', 'fantastic!']
    const [endWord, setEndWord] = useState('');
    useEffect(() => {
        setEndWord(endWordList[Math.floor(Math.random() * endWordList.length)]);
    }, [])


    return (
        <div className="endContainer">
            <div className="endHeader">
                <h2>{endWord}</h2>
            </div>
            <div className="endStats">
                {stats.wordsCompleted}
            </div>
            <div className="endButtons">
                {stats.wordsCompleted}
            </div>
        </div>
    );
}