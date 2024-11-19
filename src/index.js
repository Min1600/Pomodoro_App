import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState} from 'react'
import {useRef} from 'react'


function StartBtn(props){
  return(
    <button id="btn" onClick={props.onClick}>Start</button>
  )
}

function Dialog(){
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
    <input id="pomodoroTime" name="pomodoroTime" min="1" type="number" value="25"/>
    <label for="shortBreak">Short Break</label>
    <input id="shortBreak" name="shortBreak" min="1" type="number" value="5" />
    <label id="longBreak">Long Break</label>
    <input id="longBreak" name="longBreak" min="1" type="number" value="10" />
    <button onClick={closeDialog}>Close</button>
    </dialog>
    </>
  )
}

 function App(){
 const[sec, setSec] = useState(0)
 const intervalRef = useRef(null)
 const min = useRef(25)
 const inputValue = useRef()



 function formatTwoDigits(number) {
  return String(number).padStart(2, '0');
}

 function minValue(){
  const inputValue = document.getElementById("pomodoroTime").value - 1
  min.current = Number(inputValue)
 }

 function countDownSec(e){
  e.preventDefault()

  if(intervalRef.current){
    clearInterval(intervalRef.current)
  }

  setSec(59)

   function seconds(){
    if(min.current>0){
    setSec(s =>  {if (s > 0) {
      return s - 1;
    } else {
      countDownMin(); 
      return 59;
    }})}else if(min.current === 0){
      setSec(s => {if(s>0){
        return s-1
      }else{
        clearInterval(intervalRef.current)
        return 0
      }})
    }
  }
     intervalRef.current = setInterval(seconds, 1000)
  }

  function countDownMin(){
    min.current = min.current>0?min.current-1:0
  }

  return(
    <>
    <label for="pomodoroTime">Pomodoro</label>
    <input ref={inputValue} id="pomodoroTime" name="pomodoroTime" min="1" type="number" value="25"/>
    <Dialog/>
    <StartBtn onClick={(e) =>{e.preventDefault();minValue();countDownSec(e);}} />
    <div>{formatTwoDigits(min.current)} : {formatTwoDigits(sec)}</div>
 
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
