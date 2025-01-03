import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { initializeLocalStorage } from './localStorage';
import { Dialog } from './dialog';
import { StartBtn } from './startBtn';


const defaultSound = new Audio("https://assets.coderrocketfuel.com/pomodoro-times-up.mp3")
const guitar = new Audio("https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/start.ogg")


//Pomdoro and breaks pages display
function Buttons({pomodoro, shortBreak, longBreak, display}){
  return(
    <div id="buttonContainer">
    <button  onClick= {pomodoro}id="pomodoroBtn" className={`optionBtn ${display === "pomodoro" ? "active" : ""}`}>Pomodoro</button>
    <button  onClick= {shortBreak} id="shortBreakBtn" className={`optionBtn ${display === "shortBreak" ? "active" : ""}`}>Short Break</button>
    <button  onClick= {longBreak} id="longBreakBtn" className={`optionBtn ${display === "longBreak" ? "active" : ""}`}>Long Break </button>
    </div>
  )
}

 function App(){
  const [pomodoroData, setPomodoroData] = useState(null);
  const [start, setStart] = useState(false);
  const [display, setDisplay] = useState("pomodoro");
  const [pomodoroTime, setPomodoroTime] = useState(0);
  const [shortBreakTime, setShortBreakTime] = useState(0);
  const [longBreakTime, setLongBreakTime] = useState(0);
  const [breaks, setBreaks] = useState(0);
  const [autoStart, setAutoStart] = useState(false);
  const storage = JSON.parse(localStorage.getItem("data")) ||[];
  const root = document.documentElement

  // This useEffect runs once when the component mounts (when the page loads)
  useEffect(() => {
    const data = initializeLocalStorage(); // Initialize data from localStorage
   if(storage){setPomodoroData(data)}; // Set the state with initialized data
  }, []); // Empty dependency array ensures this runs only on mount

useEffect(() =>{
  if(display === "pomodoro"){
    root.style.setProperty('--primary', `${storage.primaryPomodoro}`);
    root.style.setProperty('--btn-bg', `${storage.btnPomodoro}`)
    root.style.setProperty('--secondary', `${storage.secondaryPomodoro}`)
  }else if(display === "shortBreak"){
    root.style.setProperty('--primary', `${storage.primaryShortBreak}`);
    root.style.setProperty('--btn-bg', `${storage.btnShortBreak}`)
    root.style.setProperty('--secondary', `${storage.secondaryShortBreak}`)
  }else{
    root.style.setProperty('--primary', `${storage.primaryLongBreak}`);
    root.style.setProperty('--btn-bg', `${storage.btnLongBreak}`)
    root.style.setProperty('--secondary', `${storage.secondaryLongBreak}`)
  }
},[display])

  useEffect(() => {
    if (pomodoroData) {
      setPomodoroTime(pomodoroData.pomodoro);
      setShortBreakTime(pomodoroData.shortBreak);
      setLongBreakTime(pomodoroData.longBreak);
      setBreaks(pomodoroData.breaks);
      setAutoStart(pomodoroData.autoStart);
    }
  }, [pomodoroData]); // Only run when pomodoroData is updated

  


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
      setBreaks(breaks)
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

const handleDialogChange = (e) => {
  const { name, value, type, checked } = e.target;
  if (type === "checkbox") {
    // Handle checkbox
    if (name === "autoStart") {
      setAutoStart(checked);
    }
  } else {
    // Handle input changes
    switch (name) {
      case "pomodoroTime":
        setPomodoroTime(parseInt(value));
        break;
      case "shortBreak":
        setShortBreakTime(parseInt(value));
        break;
      case "longBreak":
        setLongBreakTime(parseInt(value));
        break;
      case "breaks":
        setBreaks(parseInt(value));
        break;
      default:
        break;
    }
  }
};

const currentTimerMinutes =
  display === "pomodoro"
    ? pomodoroTime
    : display === "shortBreak"
    ? shortBreakTime
    : longBreakTime;

const { min, sec, setMin, setSec} = useTimer(currentTimerMinutes, start);
const [durationInSeconds, setDurationInSeconds] = useState(pomodoroTime*60)

useEffect(() => {
  setMin(currentTimerMinutes)
  setSec(0)
  setDurationInSeconds(currentTimerMinutes*60);
}, [setMin, currentTimerMinutes, setSec]);

const percentage = Math.round((((min*60) + sec)/durationInSeconds)*100)


  return(
    <>
  <div id="container">

    <div id="outline">
      <div id="view">
        <Dialog  
        pomodoroTime={pomodoroTime} 
        shortBreakTime={shortBreakTime} 
        longBreakTime={longBreakTime} 
        breaksTime={breaks} 
        autoStartChecked={autoStart}
        onChange={handleDialogChange} 
        openSettings={pauseCountDown}
        />
        <Buttons pomodoro={handleClickPomodoro} shortBreak={handleClickShortBreak} longBreak={handleClickLongBreak} display={display}/>
      </div>
    </div>

    <div id="pomodoroContainer">
      <div id="timer"> 
        <CircularProgressbar 
          value={percentage} 
          strokeWidth={3} 
          text={`${formatTwoDigits(min)} : ${formatTwoDigits(sec)}`} 
          styles={buildStyles({textColor: 'var(--text-color)', trailColor: 'var(--primary)', pathColor:'var(--secondary)'})}
        />
      </div>
    </div>

    <div id="startBtnContainer">
      <StartBtn start={start} onClick={(e) =>{e.preventDefault();start?pauseCountDown():startCountDown();}} />
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