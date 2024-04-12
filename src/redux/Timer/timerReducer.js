import { ActionTypes } from './timerAction.js';

const initialState = {
  settings: {
    workTime: 25 * 60, // 25 minutes in seconds
    breakTime: 5 * 60, // 5 minutes in seconds
    sessions: 4,
    largeBreakTime: 15 * 60, // 15 minutes in seconds
  },
  isRunning: false,
  isWorkPhase: true,
  timer: 25 * 60, // Initial time left is set to work time
};

export const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SETTINGS:
      return { ...state, settings: action.payload };
    case ActionTypes.START_STOP_TIMER:
      return { ...state, isRunning: !state.isRunning };
    case ActionTypes.PAUSE_TIMER:
      return { ...state, isRunning: false };
    case ActionTypes.RESET_TIMER:
      return { ...initialState };
    default:
      return state;
  }
};
