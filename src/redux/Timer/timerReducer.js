import { ActionTypes } from './timerAction.js';

const savedSettings = JSON.parse(localStorage.getItem('timerSettings')); // fetching values from local storage

const initialState = {
  settings: savedSettings || {
    workTime: 25 * 60, // work session time in seconds
    breakTime: 5 * 60, // break session time in seconds
    sessions: 4, //number of work sessions
    largeBreakTime: 15 * 60, // large break session time in seconds
  },
  isRunning: false, // state to check whether the timer is running or not
  isWorkSession: true, // state to check whether it is work session right now
  timer: savedSettings ? savedSettings.workTime : 25 * 60, //timer state
  maxTimer: savedSettings ? savedSettings.workTime : 25 * 60, //state to keep track of max value of timer
  sessionsLeft: savedSettings ? savedSettings.sessions : 4, //state to keep track of work sessions left
  isLargeBreak: false, //state to keep track of the large break after the last work session
};



export const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SETTINGS: //updating states
      const updatedSettings = action.payload;
      localStorage.setItem('timerSettings', JSON.stringify(updatedSettings));
      return { ...state, 
        settings: updatedSettings,
        sessionsLeft: updatedSettings.sessions,
        timer: state.isWorkSession? updatedSettings.workTime : updatedSettings.breakTime,
        maxTimer: state.isWorkSession? updatedSettings.workTime : updatedSettings.breakTime,
       };
    case ActionTypes.START_STOP_TIMER: //timer toggle
      return { ...state, isRunning: !state.isRunning };
    case ActionTypes.PAUSE_TIMER: //pause timer
      return { ...state, isRunning: false };
    case ActionTypes.RESET_TIMER: //reset states
      const resetSettings = JSON.parse(localStorage.getItem('timerSettings'));
      return {
        ...state,
        settings: resetSettings,
        timer: resetSettings.workTime,
        maxTimer: resetSettings.workTime,
        isRunning: false,
        isWorkSession: true,
        sessionsLeft: resetSettings.sessions,
        isLargeBreak: false,
      };
      case ActionTypes.TICK_TIMER:
        const { workTime, breakTime, largeBreakTime, sessions } = state.settings;
        if (state.isRunning && state.timer > 0) {
          // If timer is running and there's time left, decrement the timer
          return { ...state, timer: state.timer - 1 };
        } else if (state.isRunning && state.timer === 0) { //timer reached 0
          if (state.isWorkSession) { 
            //begun break session
            if (state.sessionsLeft === 1) {
              // Last work session complete now switching to large break session
              return {
                ...state,
                isWorkSession: false,
                timer: largeBreakTime,
                maxTimer: largeBreakTime,
                sessionsLeft: sessions,
                isLargeBreak: true,
              };
            } else {
              // work session complete now decrement 'sessionsLeft' and switch to break session
              return {
                ...state,
                isWorkSession: false,
                timer: breakTime,
                maxTimer: breakTime,
                sessionsLeft: state.sessionsLeft - 1,
                isLargeBreak: false,
              };
            }
          } else {
            //begun work session
            return {
              ...state,
              isWorkSession: true,
              timer: workTime,
              maxTimer: workTime,
              isLargeBreak: false
            };
          }
        } else if (state.isRunning && !state.isWorkSession && state.timer === 0 && state.sessionsLeft === 0) {
          //end of the large break session, and reset the state and start the cycle again
          return { ...initialState };
        } else {
          //timer has stopped
          return state;
        }
    default:
      return state;
  }
};
