
  const initializeLocalStorage = () => {
    let pomodoroData = JSON.parse(localStorage.getItem("data"));
    // Set default values if no data exists
    if (!pomodoroData) {
      const defaultData = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        breaks: 4,
        autoStart: false,
        pomodoroPrimary: '#7DB46CFF',
        shortBreakPrimary: '#AE0E36FF',
        longBreakPrimary: '#00203f',
        primaryPomodoro: 'linear-gradient(to top right, #339E66FF, #68b486)',
        btnPomodoro: '#94c9a8',
        secondaryPomodoro: '#E7EBE0FF',
        primaryLongBreak: 'linear-gradient(to top right, #00203f, #203552)',
        btnLongBreak: '#3a4a66',
        secondaryLongBreak: '#ADEFD1FF',
        primaryShortBreak: 'linear-gradient(to top right, #AE0E36FF, #bb3949)',
        btnShortBreak: '#D32E5EFF',
        secondaryShortBreak: 'beige',
      };
      localStorage.setItem("data", JSON.stringify(defaultData));
      pomodoroData = defaultData;
    }
    return pomodoroData;
  };


  export{ initializeLocalStorage }