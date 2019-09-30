import React from "react";

import BarChart from "./components/BarChart/BarChart.js";
import Map from './components/Map'

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Hello Team Man!</header>
      <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
        <Map />
    </div>
  );
}

export default App;
