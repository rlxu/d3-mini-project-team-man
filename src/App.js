import React from 'react';
import './App.css';

import Map from './components/Map'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello Team Man!
      </header>
      <p className="App-desc">
        Insert your own visualizations below!
      </p>
      <div className="App-content">
        <Map />
      </div>
    </div>
  );
}

export default App;
