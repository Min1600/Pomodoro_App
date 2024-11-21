import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState, useEffect, useRef} from 'react'



function StartBtn(props){
  return(
    <button id="btn" onClick={props.onClick}>Start</button>
  )
}

function Buttons({pomodoro, shortBreak, longBreak}){
  return(
    <div>
    <button onClick= {pomodoro}id="pomodoroBtn" class="optionBtn">Pomodoro</button>
    <button onClick= {shortBreak} id="shortBreakBtn" class="optionBtn">Short Break</button>
    <button onClick= {longBreak} id="longBreakBtn" class="optionBtn">Long Break </button>
    </div>
  )
}

function Dialog({onChange}){
  const dialogRef = useRef(null); // Reference to the dialog element
  //const [dialog, setDialog] = useState(false); // State to track if the dialog is open

  // Function to open the dialog
  const openDialog = () => {
    //setDialog(true);
    dialogRef.current.show(); // Use the show() method to display the dialog
  };

  // Function to close the dialog
  const closeDialog = () => {
   // setDialog(false);
    dialogRef.current.close(); // Use the close() method to hide the dialog
  }
  
  return(
    <>
    <button onClick={openDialog}>Settings</button>
    <dialog ref={dialogRef} id="dialog">
    <label for="pomodoroTime">Pomodoro</label>
    <input onChange={onChange} id="pomodoroTime" name="pomodoroTime" min="1" type="number" defaultValue="25"/>
    <label for="shortBreak">Short Break</label>
    <input id="shortBreak" name="shortBreak" min="1" type="number" defaultValue="5" />
    <label id="longBreak">Long Break</label>
    <input id="longBreak" name="longBreak" min="1" type="number" defaultValue="10" />
    <button onClick={closeDialog}>Close</button>
    </dialog>
    </>
  )
}


 function App(){
 const[sec, setSec] = useState(0)
 const[min, setMin] = useState(25)
 const [start, setStart] = useState(null)
 const [display, setDisplay] = useState("pomodoro")

function handleClickPomodoro(){
  setDisplay("pomodoro")
}

function handleClickShortBreak(){
  setDisplay("shortBreak")
}

function handleClickLongBreak(){
  setDisplay("longBreak")
}

 function formatTwoDigits(number) {
  return String(number).padStart(2, '0');
}

useEffect(() =>{
let interval
if(start){
interval = setInterval(() => {
  if(sec>0){
    setSec(s => s-1)
  }else if(min>0){
    setMin(m => m-1)
    setSec(59)
  }
}, 1000)
}

return () => clearInterval(interval);
}, [sec, min, start])



function startCountDown(){
  setStart(true)
}

function pauseCountDown(){
  setStart(false)
}

function pomodoroTime(e){
setMin(e.target.value)
}

function PomodoroBtn(){
  return(
  <div>{formatTwoDigits(min)} : {formatTwoDigits(sec)}</div>
  )
}

function ShortBreakBtn(){
  return(
  <div>short</div>
  )
}

function LongBreakBtn(){
  return(
    <div>long</div>
    )
}

  return(
    <>
    <Dialog onChange={pomodoroTime} />
    <StartBtn onClick={(e) =>{e.preventDefault();startCountDown();}} />
    <Buttons pomodoro={handleClickPomodoro} shortBreak={handleClickShortBreak} longBreak={handleClickLongBreak}/>
      {display==="pomodoro" && <PomodoroBtn />}
      {display === "shortBreak" && <ShortBreakBtn />}
      {display ==="longBreak" && <LongBreakBtn />}
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
