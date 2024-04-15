import logo from './logo.svg';
import './App.css';
import Homepage from './views/Homepage';
import { Provider } from 'react-redux'
import store from './redux/store'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Homepage/>
      </div>
    </Provider>
  );
}

export default App;
