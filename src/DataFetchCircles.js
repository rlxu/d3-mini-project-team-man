import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import CircularPacking from "./components/CircularPacking/CircularPacking.js";
import { thisExpression } from "@babel/types";

const API_SERVER_HOST =
  process.env.REACT_APP_API_SERVER_HOST ||
  "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json";

class DataFetchCircles extends Component {
  constructor() {
    super();
    this.state = {
      circleData: {}
    };
  }

  componentDidMount() {
    const circles = {};
    var config = {
      headers: {
        Authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAAGC%2BAAEAAAAAQBDuL%2BuzLMt2L1V6vVejiYu%2By%2Fg%3DbhzUhGy3XIGSTOgi6ptQSBowr4dRRx4dmigMBNgiN3rS5RZ51l",
        consumer_key: "Lv3IN1MKLABwVvpKrh7z13SuI",
        "Content-Type": "application/x-www-form-urlencoded",
        consumer_secret: "Z6uVPTfWvlraSNKoEDMqM35V2rRSGhh6vg4qN9RI4Vm7yutckT"
      }
    };
    axios
      .all([
        axios.get(
          API_SERVER_HOST + "?q=🥰&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=🙈&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=🤡&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=🤔&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=🤑&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=😂&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=👶&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=💂‍&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=🤺&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=🤹‍&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=👏&geocode=45.604186,-96.650757,2523km",
          config
        ),
        axios.get(
          API_SERVER_HOST + "?q=👃&geocode=45.604186,-96.650757,2523km",
          config
        )
      ])
      .then(
        axios.spread(
          (
            heartface,
            monkeyeyes,
            clown,
            thinking,
            moneyeyes,
            laughing,
            baby,
            hatman,
            fencing,
            juggling,
            clap,
            nose
          ) => {
            circles["heartface"] = heartface.data.statuses.length;
            circles["monkeyeyes"] = monkeyeyes.data.statuses.length;
            circles["clown"] = clown.data.statuses.length;
            circles["thinking"] = thinking.data.statuses.length;
            circles["moneyeyes"] = moneyeyes.data.statuses.length;
            circles["laughing"] = laughing.data.statuses.length;
            circles["baby"] = baby.data.statuses.length;
            circles["hatman"] = hatman.data.statuses.length;
            circles["fencing"] = fencing.data.statuses.length;
            circles["juggling"] = juggling.data.statuses.length;
            circles["clap"] = clap.data.statuses.length;
            circles["nose"] = nose.data.statuses.length;
            this.setState({ circleData: circles });
            console.log(circles);
          }
        )
      );
  }

  render() {
    return (
      <div>
        <h3 className="Chart-title">Frequency of Our Favorite Emojis</h3>
        <div className="Chart-row">
          <div className="Chart-item">
            {/* <CircularPacking data={this.state.circleData} /> */}
          </div>
          <div className="Chart-item">
            <p className="Chart-desc">
              We selected a handful of our favorite emojis to observe how much
              the rest of America loved these emojis as well.
            </p>
            <CircularPacking data={this.state.circleData} />
          </div>
        </div>
      </div>
    );
  }
}

export default DataFetchCircles;
