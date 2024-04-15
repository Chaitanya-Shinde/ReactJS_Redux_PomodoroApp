// store.js
import { legacy_createStore as createStore } from 'redux';
import { timerReducer } from './Timer/timerReducer.js';

// Create the Redux store
const store = createStore(timerReducer);

export default store;
