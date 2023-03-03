import {useEffect} from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Terminal from '../Terminal/Terminal';
import { dataSelector } from '../../store/dataSlice';


function App() {
  
  return (
    <div className="App">
      <Terminal />
    </div>
  );
}

export default App;
