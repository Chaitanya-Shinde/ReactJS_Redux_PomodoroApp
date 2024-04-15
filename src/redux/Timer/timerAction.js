export const ActionTypes = {
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
    START_STOP_TIMER: 'START_STOP_TIMER',
    PAUSE_TIMER: 'PAUSE_TIMER',
    RESET_TIMER: 'RESET_TIMER',
    TICK_TIMER: 'TICK_TIMER',
  };
  
  export const updateSettings = (settings) => ({
    type: ActionTypes.UPDATE_SETTINGS,
    payload: settings,
  });
  
  export const startStopTimer = () => ({
    type: ActionTypes.START_STOP_TIMER,
  });
  
  export const pauseTimer = () => ({
    type: ActionTypes.PAUSE_TIMER,
  });
  
  export const resetTimer = () => ({
    type: ActionTypes.RESET_TIMER,
  });
  
  export const tickTimer = () => ({
    type: ActionTypes.TICK_TIMER,
  });