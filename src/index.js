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

function Dialog({pomodoroRef}){
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
    <input ref ={pomodoroRef} id="pomodoroTime" name="pomodoroTime" min="1" type="number" defaultValue="25"/>
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
 const intervalRef = useRef(null)
 //const min = useRef(25)
 const pomodoroRef = useRef(25)


 function formatTwoDigits(number) {
  return String(number).padStart(2, '0');
}

 function minValue(){
  pomodoroRef.current = pomodoroRef.current.value - 1
 }


 function countDownSec(e){
  e.preventDefault()

  if(intervalRef.current){
    clearInterval(intervalRef.current)
  }

  setSec(10)

   function seconds(){
    setSec((s) => {
      if (s > 0) {
        return s - 1; // Decrement seconds
      } else {
        // Seconds hit 0
        if (pomodoroRef.current > 0) {
          pomodoroRef.current -= 1; // Directly decrement minutes
          return 10; // Reset seconds
        } else {
          clearInterval(intervalRef.current); // Stop the timer
          return 0;
        }
      }
    });
  }
     intervalRef.current = setInterval(seconds, 1000)
  }

  function countDownMin(){
    pomodoroRef.current = pomodoroRef.current>0?pomodoroRef.current-1:0
  }

  return(
    <>
    <Dialog pomodoroRef={pomodoroRef} />
    <StartBtn onClick={(e) =>{e.preventDefault();minValue();countDownSec(e);}} />
    <div>{formatTwoDigits(pomodoroRef.current)} : {formatTwoDigits(sec)}</div>
 
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
