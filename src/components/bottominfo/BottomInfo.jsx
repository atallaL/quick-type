import './BottomInfo.css'

import {Link} from 'react-router-dom'

export default function BottomInfo() {
    return (
        <div className="bottomInfoContainer">
            <div className="bottomInfoText">
                <p>designed by <a target="_blank" href='https://atallal.github.io/portfolio-website/'>leonardo atalla</a></p>
            </div>
        </div>
    );
}