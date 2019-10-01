import React, { Component } from "react";
import { select } from "d3-selection";
import * as d3 from "d3";

class CircularPacking extends Component {
  constructor(props) {
    super(props);
    this.createCircularPackingChart = this.createCircularPackingChart.bind(
      this
    );
  }
  componentDidMount() {
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
    console.log(node);
    const data = this.props.data;

    // append the svg object to the body of the page
    const svg = select(node)
      .append("g")
      .attr("width", width)
      .attr("height", height);
    console.log(svg);
    // Read data
    // d3.csv(
    //   "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv",
    //   function(data) {
    //     // Filter a bit the data -> more than 1 million inhabitants
    //     data = data.filter(function(d) {
    //       return d.value > 10000000;
    //     });

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
      Tooltip.html("<u>" + d.key + "</u>" + "<br>" + d.value + " inhabitants")
        .style("left", d3.mouse(this)[0] + 20 + "px")
        .style("top", d3.mouse(this)[1] + "px");
    };
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0);
    };

    // Initialize the circle: all located at the center of the svg area
    node = svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("r", function(d) {
        return size(d.value);
      })
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function(d) {
        return color(d.region);
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
            return size(d.value) + 3;
          })
          .iterations(1)
      ); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation.nodes(data).on("tick", function(d) {
      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
    });

    // What happens when a circle is dragged?
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
    return (
      <svg ref={node => (this.node = node)} width={500} height={500}></svg>
    );
  }
}
export default CircularPacking;
