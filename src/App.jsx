import { useState } from 'react'
import './App.css'

import logo from './assets/logo.png'

import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return (
    <>
      <div className="mainContainer">
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
              <p>how do i play?</p>
            </div>
          </div>
          <div className="homeBottom">
            <div className="difficultySelection">
              <p>hi</p>
            </div>
          </div>

        </div>
      </div>
    </>
  )  
}

export default App
