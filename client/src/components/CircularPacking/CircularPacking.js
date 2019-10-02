import React, { Component } from "react";
import { select } from "d3-selection";
import axios from "axios";
import * as d3 from "d3";

const API_SERVER_HOST =
  process.env.REACT_APP_API_SERVER_HOST ||
  "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json";

class CircularPacking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleData: {}
    };
    this.createCircularPackingChart = this.createCircularPackingChart.bind(
      this
    );
  }
  componentDidMount() {
    // const circles = {};
    // var config = {
    //   headers: {
    //     Authorization:
    //       "Bearer AAAAAAAAAAAAAAAAAAAAAGC%2BAAEAAAAAQBDuL%2BuzLMt2L1V6vVejiYu%2By%2Fg%3DbhzUhGy3XIGSTOgi6ptQSBowr4dRRx4dmigMBNgiN3rS5RZ51l",
    //     consumer_key: "Lv3IN1MKLABwVvpKrh7z13SuI",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     consumer_secret: "Z6uVPTfWvlraSNKoEDMqM35V2rRSGhh6vg4qN9RI4Vm7yutckT"
    //   }
    // };
    // axios
    //   .all([
    //     axios.get(
    //       API_SERVER_HOST + "?q=🥰&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=🙈&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=🤡&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=🤔&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=🤑&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=😂&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=👶&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=💂‍&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=🤺&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=🤹‍&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=👏&geocode=45.604186,-96.650757,2523km",
    //       config
    //     ),
    //     axios.get(
    //       API_SERVER_HOST + "?q=👃&geocode=45.604186,-96.650757,2523km",
    //       config
    //     )
    //   ])
    //   .then(
    //     axios.spread(
    //       (
    //         heartface,
    //         monkeyeyes,
    //         clown,
    //         thinking,
    //         moneyeyes,
    //         laughing,
    //         baby,
    //         hatman,
    //         fencing,
    //         juggling,
    //         clap,
    //         nose
    //       ) => {
    //         circles["heartface"] = heartface.data.statuses.length;
    //         circles["monkeyeyes"] = monkeyeyes.data.statuses.length;
    //         circles["clown"] = clown.data.statuses.length;
    //         circles["thinking"] = thinking.data.statuses.length;
    //         circles["moneyeyes"] = moneyeyes.data.statuses.length;
    //         circles["laughing"] = laughing.data.statuses.length;
    //         circles["baby"] = baby.data.statuses.length;
    //         circles["hatman"] = hatman.data.statuses.length;
    //         circles["fencing"] = fencing.data.statuses.length;
    //         circles["juggling"] = juggling.data.statuses.length;
    //         circles["clap"] = clap.data.statuses.length;
    //         circles["nose"] = nose.data.statuses.length;
    //         this.setState({ circleData: circles });
    //         console.log(circles);
    //       }
    //     )
    //   );
    this.createCircularPackingChart();
  }
  componentDidUpdate() {
    this.createCircularPackingChart();
  }

  createCircularPackingChart() {
    // set the dimensions and margins of the graph
    var width = 700;
    var height = 460;

    var node = this.node;
    var data = this.props.data;
    data = Object.entries(data).reduce((acc, cur) => {
      const newItem = {
        emoji: cur[0],
        count: cur[1]
      };
      acc.push(newItem);
      return acc;
    }, []);

    // append the svg object to the body of the page
    const svg = select(node)
      .attr("width", width)
      .attr("height", height)
      .append("g");
    // console.log(svg);
    // Read data
    // d3.csv(
    //   "/api",
    //   // "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv",
    //   function(data) {
    //     // Filter a bit the data -> more than 1 million inhabitants
    //     // data = data.filter(function(d) {
    //     //   return d.value > 10000000;
    //     // });
    //     console.log(data);
    //   }
    // );
    //
    // data = this.state.circleData;
    // console.log(data);
    // console.log(this.state.circleData);

    // Color palette for continents?
    var color = d3
      .scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet1);

    // Size scale for countries
    var size = d3
      .scaleLinear()
      .domain([0, 15])
      .range([7, 55]); // circle will be between 7 and 55 px wide

    // create a tooltip
    var Tooltip = d3
      .select("g")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip.style("opacity", 1);
    };
    var mousemove = function(d) {
      Tooltip.html("<u>" + d + "</u>" + "<br>" + d + " inhabitants")
        .style("left", d3.mouse(this)[0] + 20 + "px")
        .style("top", d3.mouse(this)[1] + "px");
    };
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0);
    };

    // Initialize the circle: all located at the center of the svg area
    node = svg
      .append("g")
      .attr("class", "group-container")
      .selectAll("circle")
      .data(data)
      .enter();
    node
      .append("circle")
      .attr("class", "circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", function(d) {
        return d.count * 3;
      })
      .style("fill", function(d) {
        return color(d);
      })
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(
        d3
          .drag() // call specific function when circle is dragged
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
    node
      .append("text")
      .attr("class", "emojis")
      .text(function(d) {
        var textToEmoji = {
          heartface: "🥰",
          monkeyeyes: "🙈",
          clown: "🤡",
          thinking: "🤔",
          moneyeyes: "🤑",
          laughing: "😂",
          baby: "👶",
          hatman: "💂‍",
          fencing: "🤺",
          juggling: "🤹‍",
          clap: "👏",
          nose: "👃"
        };
        return textToEmoji[d.emoji];
      })
      .attr("dx", d => d.x - 5)
      .attr("dy", d => d.y + 50)
      .attr("font-size", function(d) {
        return d.count * 2;
      });

    var circles = d3.selectAll(".circle");
    var emojis = d3.selectAll(".emojis");
    console.log(node);

    // Features of the forces applied to the nodes:
    var simulation = d3
      .forceSimulation()
      .force(
        "center",
        d3
          .forceCenter()
          .x(width / 2)
          .y(height / 2)
      ) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.2)
          .radius(function(d) {
            return d.count * 2 + 15;
          })
          .iterations(1)
      ); // Force that avoids circle overlapping
    //
    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation.nodes(data).on("tick", function(d) {
      circles
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
      emojis.attr("dx", d => d.x).attr("dy", d => d.y);
    });

    // // What happens when a circle is dragged?
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0.03);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    return <svg ref={node => (this.node = node)} fill={"#c8c8c8"}></svg>;
  }
}
export default CircularPacking;
