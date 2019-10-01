import React from "react";
import "./App.css";
import postman from "./postMAN.png";
import BarChart from "./components/BarChart/BarChart.js";
import DataFetchCircles from "./DataFetchCircles.js";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <header className="App-header">
          We, the People 👨‍👩‍👧‍👦
          <p className="title">1. Frequency of Our Favorite Emojis</p>
          <p className="title">2. Usage of 🍆 Throughout the Day</p>
          <p className="title">3. Most Popular Emojis Per State</p>
          <img src={postman} className="postman" />
        </header>
        <rect className="orange-bar"></rect>
        <BarChart />
        <DataFetchCircles />
      </div>
    </div>
  );
}

export default App;
