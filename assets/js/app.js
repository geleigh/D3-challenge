// D3 Homework - Data-Journalism

// Setup Chart Parameters/Dimensions
var svgWidth = 980;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 90,
  left: 100
};

// Define Dimensions of the Chart Area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

 // Create an SVG Element/Wrapper
 var svg = d3
 .select("#scatter")
 .append("svg")
 .attr("width", svgWidth)
 .attr("height", svgHeight);

  // Append Group Element 
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import CSV and Cast Data
  d3.csv("assets/data/data.csv").then(function(stateData) {
    stateData.forEach(function(data){
      data.poverty = +data.poverty
      data.healthcare = +data.healthcare
  })

  // Scale the Functions -- Poverty = X, Healthcare = Y
  var xLinearScale = d3.scaleLinear() 
  .domain([d3.min(stateData, d => d.poverty)-2, 24])
  .range([0, width]);

var yLinearScale = d3.scaleLinear()
  .domain([4, d3.max(stateData, d => d.healthcare)])
  .range([height, 0]);

// Axis Functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append Axes
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);
chartGroup.append("g")
.call(leftAxis);

// Create the Points on the Scatterplot to Include State Abbreviations
var circlesAndText = chartGroup.selectAll("g")
  .data(stateData)

var circlesAndTextEnter = circlesAndText.enter()
  .append("g")

var circle = circlesAndTextEnter.append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "12") 
  .attr("fill", "skyblue") 

circlesAndTextEnter.append("text")
  .attr("dx", d => xLinearScale(d.poverty))
  .attr("dy", d => yLinearScale(d.healthcare) + 5)
  .attr("text-anchor","middle")
  .attr("fill","grey")
  .attr("font-family", "arial")
  .text(function(d){return d.abbr})

// Label Axes
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height /1.5))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Healthcare (% population without)");

chartGroup.append("text")
.attr("transform", `translate(${width / 3}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("Poverty (% population)");
});