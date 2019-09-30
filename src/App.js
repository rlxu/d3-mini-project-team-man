import React from "react";
import BarChart from "./components/BarChart/BarChart.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Hello Team Man!</header>
      <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
    </div>
  );
}

export default App;
