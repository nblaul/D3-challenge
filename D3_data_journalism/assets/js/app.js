// @TODO: YOUR CODE HERE!
// create svg element
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG Group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data
d3.csv("assets/data/data.csv").then(function(data) {
    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        d.abbr = d.abbr;
        console.log(d.poverty);
        console.log(d.healthcare);
        console.log(d.abbr);
    });
    console.log(data);

// create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d=> d.poverty) -1, d3.max(data, d => d.poverty) + 1])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d=>d.healthcare) -1, d3.max(data, d => d.healthcare) + 2])
        .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);
    
    // Create circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .classed("stateCircle", true);

    // create state text
    chartGroup.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare) +4)
        .text(d => d.abbr)
        .classed("stateText", true);

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height /2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lack Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
}).catch(function(error) {
    console.log(error);
});

