import './Topbar.css'

import 'bootstrap-icons/font/bootstrap-icons.css';

import clickSFX from '../../soundeffect/topbar.ogg'
import {playAudio} from '../../utils/soundPlayer'

export default function Topbar({lightmode, switchMode, audioEnabled, toggleAudio}) {
    
    //handle mode switch
    const handleModeSwitch = () => {
        switchMode()
        playAudio(clickSFX);
    }

    //handle audio toggle
    const handleAudioToggle = () => {
        playAudio(clickSFX);
        toggleAudio()
    }


    return (
        <div className="topbarContainer">
            <div className="topbarElem" onClick={handleModeSwitch}>
                <i className={`bi ${lightmode ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
            </div>
            <div className="topbarElem topbarAudio" onClick={handleAudioToggle}>
                <i className={`bi ${audioEnabled ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'}`}></i>
            </div>
        </div>
    );
}