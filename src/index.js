import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState, useEffect, useRef} from 'react'

window.onload = () => {
let pomodoroData = JSON.parse(localStorage.getItem("data"))

if(!pomodoroData){
  let info = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    breaks: 4,
    autoStart: false
  }
  localStorage.setItem("data", JSON.stringify(info));
}
}

const defaultSound = new Audio("https://assets.coderrocketfuel.com/pomodoro-times-up.mp3")
const guitar = new Audio("https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/start.ogg")
const duration = JSON.parse(localStorage.getItem("data")) || {}
let pomodoroJSON = duration.pomodoro
let shortBreakJSON = duration.shortBreak
let longBreakJSON = duration.longBreak
let breaksJSON = duration.breaks
let autoStartJSON = duration.autoStart

function StartBtn({onClick, start}){
  return(
   start?<button id="startBtn" class="btn" onClick={onClick}>Pause</button>:<button id="startBtn" class="btn" onClick={onClick}>Start</button>
  )
}

function Buttons({pomodoro, shortBreak, longBreak, display}){
  return(
    <div>
    <button  onClick= {pomodoro}id="pomodoroBtn" className={`optionBtn ${display === "pomodoro" ? "active" : ""}`}>Pomodoro</button>
    <button  onClick= {shortBreak} id="shortBreakBtn" className={`optionBtn ${display === "shortBreak" ? "active" : ""}`}>Short Break</button>
    <button  onClick= {longBreak} id="longBreakBtn" className={`optionBtn ${display === "longBreak" ? "active" : ""}`}>Long Break </button>
    </div>
  )
}

function Dialog({onChange}){
  const dialogRef = useRef(null); 
  const pomodoroValue = useRef(null)
  const shortBreakValue = useRef(null)
  const longBreakValue = useRef(null)
  const breaksValue = useRef(null)
  const autoStart = useRef(null)
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("data")) || {};
    if (autoStart.current) {
      autoStart.current.checked = savedData.autoStart || false; // Default to false if not set
    }
  }, []);
  const openDialog = () => {
    //setDialog(true);
    dialogRef.current.show(); // Use the show() method to display the dialog
  };

  // Function to close the dialog
  const closeDialog = () => {
   // setDialog(false);
    dialogRef.current.close(); // Use the close() method to hide the dialog
  }
  
  function updateLocalStorage(){
duration.pomodoro = pomodoroValue.current.value
duration.shortBreak = shortBreakValue.current.value
duration.longBreak = longBreakValue.current.value
duration.breaks = breaksValue.current.value
duration.autoStart = autoStart.current.checked

localStorage.setItem("data", JSON.stringify(duration))
  }
  
  return(
    <>
    <button onClick={openDialog}>Settings</button>
    <dialog ref={dialogRef} id="dialog">
      <p id="dialogTitle">Time (minutes)</p>
    <div id="dialogContainer">

      <div class="inputContainer">
    <label for="pomodoroTime">Pomodoro</label>
    <input ref ={pomodoroValue} onChange={onChange} id="pomodoroTime" name="pomodoroTime" min="1" type="number" defaultValue= {pomodoroJSON}/>
      </div>  

      <div class="inputContainer">
    <label for="shortBreak">Short Break</label>
    <input ref={shortBreakValue} onChange={onChange} id="shortBreak" name="shortBreak" min="1" type="number" defaultValue={shortBreakJSON} />
      </div> 

      <div class="inputContainer">
    <label for="longBreak">Long Break</label>
    <input ref={longBreakValue} onChange={onChange} id="longBreak" name="longBreak" min="1" type="number" defaultValue={longBreakJSON} />
      </div> 

    </div>

      <div id="autoStartContainer">
      Auto Start 
    <label class="switch" for ="autoStart">
    <div class="slider round">
      <div class="knob"></div>
    </div>
    <input ref={autoStart} id="autoStart" name="autoStart" type="checkbox"  /> 
    </label>

   
      </div>

      <div id="longIntervalBreak">
    <label for="breaks">Long Break Interval</label>
    <input ref={breaksValue} onChange ={onChange} id="breaks" name="breaks" min="1" type="number" defaultValue={breaksJSON} />
      </div>

       <div>
    <button id ="closeBtn" onClick={() => {closeDialog(); updateLocalStorage()}}>Close</button>
      </div>

    </dialog>
    </>
  )
}


 function App(){
const [start, setStart] = useState(false)
const [display, setDisplay] = useState("pomodoro")
const [pomodoroTime, setPomodoroTime] = useState(pomodoroJSON); 
const [shortBreakTime, setShortBreakTime] = useState(shortBreakJSON); 
const [longBreakTime, setLongBreakTime] = useState(longBreakJSON);
const [breaks, setBreaks] = useState(breaksJSON)
const autoStart = autoStartJSON

function handleClickPomodoro(){
  setDisplay("pomodoro")
  setStart(false)
  setSec(0)
}

function handleClickShortBreak(){
  setDisplay("shortBreak")
  setStart(false)
  setSec(0)
}

function handleClickLongBreak(){
  setDisplay("longBreak")
  setStart(false)
  setSec(0)
}

 function formatTwoDigits(number) {
  return String(number).padStart(2, '0');
}

function useTimer(current, start){
  const[sec, setSec] = useState(0)
  const[min, setMin] = useState(current)

useEffect(() =>{
let interval
if(start){
interval = setInterval(() => {
  if(sec>0){
    setSec(s => s-1)
  }else if(min>0){
    setMin(m => m-1)
    setSec(59)
  }else if(min === 0){
    defaultSound.play()
    if(display === "shortBreak"){
      setDisplay("pomodoro")
      setMin(pomodoroTime)
      autoStart?setStart(true):setStart(false)
    }else{
    if(breaks > 1){
    setDisplay("shortBreak")
    setMin(shortBreakTime)
    setBreaks(parseInt(breaks) - 1)
    autoStart?setStart(true):setStart(false)
    }else if(breaks === 1){
      setDisplay("longBreak")
      setMin(longBreakTime)
      setBreaks(0)
      autoStart?setStart(true):setStart(false)
    }else if(breaks === 0){
      setDisplay("pomodoro")
      setMin(pomodoroTime)
      setBreaks(breaksJSON)
      autoStart?setStart(true):setStart(false)
    }
   }
  }
}, 1000)
}

return () => clearInterval(interval);
}, [sec, min, start])

return{min, sec, setMin, setSec}
}
function startCountDown(){
  setStart(true)
}

function pauseCountDown(){
  setStart(false)
}

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === "pomodoroTime") {
    setPomodoroTime(parseInt(value));
  } else if (name === "shortBreak") {
    setShortBreakTime(parseInt(value));
  } else if (name === "longBreak") {
    setLongBreakTime(parseInt(value));
  } else if(name === "breaks"){
    setBreaks(parseInt(value))
  }
};

const durationInSeconds = display==="pomodoro"?pomodoroJSON*60:display==="shortBreak"?shortBreakJSON*60:longBreakJSON*60

const currentTimerMinutes =
  display === "pomodoro"
    ? pomodoroTime
    : display === "shortBreak"
    ? shortBreakTime
    : longBreakTime;

const { min, sec, setMin, setSec} = useTimer(currentTimerMinutes, start);

useEffect(() => {
  setMin(currentTimerMinutes);
}, [setMin, currentTimerMinutes]);

const [animationKey, setAnimationKey] = useState(0);

const resetAnimation = () => {
  setAnimationKey((prevKey) => prevKey + 1); // Increment key to reset animation
}

  return(
    <>
  <div id="container">
    <div>{breaks}</div>
    <Dialog onChange={handleInputChange} />
    <StartBtn start={start} onClick={(e) =>{e.preventDefault();start?pauseCountDown():startCountDown();}} />
    <div id="outline"><div id="view"><Buttons pomodoro={handleClickPomodoro} shortBreak={handleClickShortBreak} longBreak={handleClickLongBreak} display={display}/></div></div>
    <div id="pomodoroContainer">

      <div id="timer"> 

       <svg key={animationKey}  onAnimationEnd={resetAnimation}  width="250" height="250" viewBox="0 0 250 250"className="circular-progress"
         style={{"--progress": 0, animation: start?`progress-animation ${durationInSeconds}s linear 0s 1 forwards`:""}}>
          <circle class="bg"></circle>
          <circle class="fg"></circle>
            <text x="50%"  y="50%" textAnchor="middle" dominantBaseline="middle" className="progress-text">
              {formatTwoDigits(min)} : {formatTwoDigits(sec)}
            </text>
          </svg>

      </div>
    </div>
  </div>
    </>
  )
 }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();