import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Terminal from '../Terminal/Terminal'

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Terminal />
    </div>
  );
}

export default App;
