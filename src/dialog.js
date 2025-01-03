import React from 'react';
import './index.css';
import { useRef, useState } from 'react'

function Dialog({
  pomodoroTime, 
  shortBreakTime, 
  longBreakTime, 
  breaksTime, 
  autoStartChecked, 
  onChange
}) {
  const dialogRef = useRef(null); 
  //const colourPickerRef = useRef(null);
  //const [activeButton, setActiveButton] = useState(null);
  const curr = JSON.parse(localStorage.getItem("data"));
  const pomodoroPrimary = curr?.pomodoroPrimary 
  const shortBreakPrimary = curr?.shortBreakPrimary
  const longBreakPrimary = curr?.longBreakPrimary
  //const root = document.documentElement
  

  const openDialog = () => {
    dialogRef.current.show(); 
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  /*const openColourPicker = () => {
    colourPickerRef.current.show();
  };

  const active = (buttonId) =>{
    setActiveButton(buttonId);
  }

  const closeColourPicker = () => {
    colourPickerRef.current.close();
    //updateLocalStorage()
  };

  const updateColour = (color, gradient, btn, secondary ) => {
    const storage = JSON.parse(localStorage.getItem("data"));
if(activeButton){
  document.getElementById(activeButton).style.backgroundColor = color;

}

    if (activeButton === 'pomodoroColour') {
      const pomodoro = {
        
        primaryPomodoro : `linear-gradient(to top right,${color}, ${gradient})`,
        btnPomodoro: `${btn}`,
         secondaryPomodoro : `${secondary}`,
         pomodoroPrimary : `${color}`
      }
      const updatedData = {...storage, ...pomodoro}
      localStorage.setItem("data", JSON.stringify(updatedData));
    }else if(activeButton === 'shortBreakColour'){
      const shortBreak = {
        primaryShortBreak : `linear-gradient(to top right,${color}, ${gradient})`,
        btnShortBreak: `${btn}`,
         secondaryShortBreak : `${secondary}`,
         shortBreakPrimary : `${color}`
      }
      const updatedData = {...storage, ...shortBreak }
      localStorage.setItem("data", JSON.stringify(updatedData));
    }
  };*/

  function updateLocalStorage() {
    const storage = JSON.parse(localStorage.getItem("data"));
    const duration = {
      pomodoro: pomodoroTime,
      shortBreak: shortBreakTime,
      longBreak: longBreakTime,
      breaks: breaksTime,
      autoStart: autoStartChecked,
    };
    const updatedData = { ...storage, ...duration}
    localStorage.setItem("data", JSON.stringify(updatedData));
  }
    
    return(
      <>
      <button class="btn" onClick={openDialog} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  </button>
  <dialog ref={dialogRef} id="dialog">
        <p id="dialogTitle">Time (minutes)</p>
        <div id="dialogContainer">
          <div className="inputContainer">
            <label htmlFor="pomodoroTime">Pomodoro</label>
            <input 
              onChange={onChange} 
              id="pomodoroTime" 
              name="pomodoroTime" 
              min="1" 
              type="number" 
              value={pomodoroTime} 
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="shortBreak">Short Break</label>
            <input 
              onChange={onChange} 
              id="shortBreak" 
              name="shortBreak" 
              min="1" 
              type="number" 
              value={shortBreakTime} 
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="longBreak">Long Break</label>
            <input 
              onChange={onChange} 
              id="longBreak" 
              name="longBreak" 
              min="1" 
              type="number" 
              value={longBreakTime} 
            />
          </div>
        </div>

        <div id="autoStartContainer">
          Auto Start
          <label className="switch" htmlFor="autoStart">
            <div className="slider round">
              <div className="knob"></div>
            </div>
            <input 
              id="autoStart" 
              name="autoStart" 
              type="checkbox" 
              checked={autoStartChecked} 
              onChange={onChange} 
            />
          </label>
        </div>

        <div id="longIntervalBreak">
          <label htmlFor="breaks">Long Break Interval</label>
          <input 
            onChange={onChange} 
            id="breaks" 
            name="breaks" 
            min="1" 
            type="number" 
            value={breaksTime} 
          />
        </div>

        <div>
          <button className="closeBtn" onClick={() => { closeDialog(); updateLocalStorage(); }}>Close</button>
        </div>

        <div id="colourTheme">
          <p>Colour Theme:</p>
          <div>
            <button onClick={function () {/*openColourPicker(); active("pomodoroColour")*/}} id="pomodoroColour" className="colourBtn" style={{backgroundColor: `${pomodoroPrimary}`}}></button>
            <button onClick={function () {/*openColourPicker(); active("shortBreakColour")*/}} id="shortBreakColour" className="colourBtn" style={{backgroundColor: `${shortBreakPrimary}`}}></button>
            <button onClick={function () {/*openColourPicker(); active("longBreakColour")*/}}id="longBreakColour" className="colourBtn" style={{backgroundColor: `${longBreakPrimary}`}}></button>
          </div>
        </div>

        {/*<dialog ref={colourPickerRef} id="colourPicker">
          <div>
            <button onClick={function () {closeColourPicker();  updateColour('#00203f', '#203552', '#3a4a66', '#ADEFD1FF')}} className="colourPickerBtn" id="dark" style={{backgroundColor: `#00203f`}}></button>
            <button onClick={closeColourPicker} className="colourPickerBtn" id="light"></button>
            <button onClick={function () {closeColourPicker();updateColour('#AE0E36FF', '#bb3949', '#D32E5EFF', 'beige')}}  className="colourPickerBtn" id="colourful" style={{backgroundColor: "#AE0E36FF"}}></button>
          </div>
        </dialog>*/}
      </dialog>
    </>
  );
}

export { Dialog };