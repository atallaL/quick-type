import './EndScreen.css'

import 'bootstrap-icons/font/bootstrap-icons.css';

import {playAudio} from '../../utils/soundPlayer'

export default function EndScreen({stats}) {
    
    return (
        <div className="endContainer">
            {stats.wordsCompleted}
        </div>
    );
}