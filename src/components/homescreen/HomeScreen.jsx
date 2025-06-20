import './HomeScreen.css'

import logo from '../../assets/logo.png'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function HomeScreen({setGameState}) {
    return (
        <div className="homeContainer">
            <div className="homeCenter">
            <div className="logoContainer">
                <img src={logo} />
            </div>
            <div className="homeStart">
                <div className="startButton">
                <h2>start</h2>
                <i class="bi bi-caret-right-fill"></i>
                </div>
                <div className="homeHow">
                <p>how do i play?</p>
                </div>
            </div>
            </div>
            <div className="homeBottom">
            <div className="difficultySelection">
                <p>hi</p>
            </div>
            </div>

        </div>
    );
}