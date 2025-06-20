import './Topbar.css'

import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Topbar({lightmode, switchMode, audioEnabled, toggleAudio}) {
    return (
        <div className="topbarContainer">
            <div className="topbarElem" onClick={switchMode}>
                <i className={`bi ${lightmode ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
            </div>
            <div className="topbarElem topbarAudio" onClick={toggleAudio}>
                <i class={`bi ${audioEnabled ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'}`}></i>
            </div>
        </div>
    );
}