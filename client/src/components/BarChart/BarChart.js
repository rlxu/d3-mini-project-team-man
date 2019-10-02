import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { strict } from "assert";
import * as moment from "moment";
import * as d3 from "d3";
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.loadBarChart = this.loadBarChart.bind(this);
    this.state = {
      eggplantTweets: [],
      data: [0, 0, 0, 0, 0, 0, 0, 0]
    };
    this.yScale = scaleLinear();
  }

  componentDidMount() {
    var dataFill = [0, 0, 0, 0, 0, 0, 0, 0];
    fetch("/api")
      .then(res => res.json())
      .then(tweets => {
        for (var i = 0; i < tweets.length; i++) {
          var obj = tweets[i];
          if (obj.text.includes("🤡")) {
            var timestamp = moment.unix(Number(obj.timestamp)).format("LT");
            dataFill[this.timestampMatch(timestamp)]++;
          }
        }
        this.setState({ data: dataFill });

        this.loadBarChart();
      });
  }
  timestampMatch(timestamp) {
    if (timestamp.includes("AM")) {
      if (
        timestamp.includes("12:") ||
        (!timestamp.includes("11:") && timestamp.includes("1:")) ||
        timestamp.includes("2:")
      ) {
        return 0;
      }
      if (
        timestamp.includes("3:") ||
        timestamp.includes("4:") ||
        timestamp.includes("5:")
      ) {
        return 1;
      }
      if (
        timestamp.includes("6:") ||
        timestamp.includes("7:") ||
        timestamp.includes("8:")
      ) {
        return 2;
      }

      if (
        timestamp.includes("9:") ||
        timestamp.includes("10:") ||
        timestamp.includes("11:")
      ) {
        return 3;
      }
    } else {
      if (
        (!timestamp.includes("11:") && timestamp.includes("1:")) ||
        timestamp.includes("2:") ||
        timestamp.includes("3:")
      ) {
        return 4;
      }
      if (
        timestamp.includes("4:") ||
        timestamp.includes("5:") ||
        timestamp.includes("6:")
      ) {
        return 5;
      }
      if (
        timestamp.includes("7:") ||
        timestamp.includes("8:") ||
        timestamp.includes("9:")
      ) {
        return 6;
      }

      if (
        timestamp.includes("10:") ||
        timestamp.includes("11:") ||
        timestamp.includes("12:")
      ) {
        return 7;
      }
    }
  }

  loadBarChart() {
    var svgWidth = 500,
      svgHeight = 200;
    var barWidth = svgWidth / this.state.data.length;
    var svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("background", "#c4c4c4")
      .style("stroke", "black")
      .attr("style", "outline: thin solid #c4c4c4;");

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.state.data)])
      .range([0, svgHeight * 0.9]);
    var barChart = svg
      .selectAll("rect")
      .data(this.state.data)
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return svgHeight - yScale(d);
      })
      .attr("height", function(d) {
        return yScale(d);
      })
      .attr("width", barWidth - 2)
      .attr("transform", function(d, i) {
        var translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
      })
      .style("fill", function(d, i) {
        var colors = [
          "#F1DC76",
          "#FFC86B",
          "#FFCC62",
          "#FAB65A",
          "#F68E67",
          "#E0727E",
          "#262469",
          "#001D45"
        ];
        return colors[i];
      });

    var text = svg
      .selectAll("text")
      .data(this.state.data)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("y", function(d, i) {
        return svgHeight - yScale(d) - 2;
      })
      .attr("x", function(d, i) {
        return barWidth * i + barWidth / 3;
      });

    var xAxis = svg
      .data(this.state.data)
      .enter()
      .append("text")
      .text(function(d, i) {
        var xAxisText = [
          "12-3AM",
          "3-6AM",
          "6-9AM",
          "9-12PM",
          "12-3PM",
          "3-6PM",
          "6-9PM",
          "9-12PM"
        ];
        return xAxisText[i];
      })
      .attr("y", 4)
      .attr("x", function(d, i) {
        return barWidth * i + barWidth / 3;
      });
  }

  render() {
    return (
      <div>
        <h3 style={{ "text-align": "center" }}>
          Usage of 🤡 Throughout the Day
        </h3>
        <svg ref={node => (this.node = node)} className="svg"></svg>
        <div>
          12-3AM&nbsp;&nbsp; 3-6AM &nbsp;&nbsp;6-9AM &nbsp;&nbsp;9-12PM
          &nbsp;&nbsp;12-3PM &nbsp;&nbsp;3-6PM&nbsp;&nbsp; 6-9PM
          &nbsp;&nbsp;9-12AM
        </div>
      </div>
    );
  }
}
export default BarChart;
