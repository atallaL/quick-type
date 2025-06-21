import './Topbar.css'

import {useState} from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';

import {isMobile} from '../../utils/isMobile' //gray out the audio button for mobile devices

export default function Topbar({lightmode, switchMode, audioEnabled, toggleAudio}) {
    
    const [tapped, setTapped] = useState(false);

    //handle mode switch
    const handleModeSwitch = () => {
        switchMode()
    }

    //handle audio toggle
    const handleAudioToggle = () => {
        //flash red if on mobile (add the tapped class)
        if (isMobile()) {
            setTapped(true);
            setTimeout(() => setTapped(false), 200);
            return;
        }
        toggleAudio()
    }

    return (
        <div className="topbarContainer">
            <div className="topbarElem" onClick={handleModeSwitch}>
                <i className={`bi ${lightmode ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
            </div>
            <div className={`topbarElem topbarAudio ${isMobile() ? 'disabled' : ''} ${tapped ? 'tapped' : ''}`} onClick={handleAudioToggle}>
                <i className={`bi ${audioEnabled ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'}`}></i>
            </div>
        </div>
    );
}