// set the dimensions and margins of the graph
var margin = {top: 70, right: 0, bottom: 0, left: 0},
    width = 480 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom,
    innerRadius = 80,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3.select("#my_datavizFalu")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + (width / 2.2 + margin.left) + "," + (height / 2.2 + margin.top) + ")");

d3.csv("megye_falu_atlag.csv", function(data) {

  // Scales
  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .domain(data.map(function(d) { return d.COUNTRY; })); // The domain of the X axis is the list of states.
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([5, 8]); // Domain of Y is from 0 to the max seen in the data

  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#my_datavizFalu")
    .append("my_datavizFalu")
    .style("opacity", 0)
    .attr("class", "tooltip")


  var mouseover = function(d) {
    tooltip
       .html("Átlag:" + d['AVG'])
       .style("opacity", 1)
  }

  var mouseleave = function(d) {
    tooltip
       .style("opacity", 0)
  }

  // Add the bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", "steelblue")
    .attr("d", d3.arc()     // imagine your doing a part of a donut plot
    .innerRadius(innerRadius)
    .outerRadius(function(d) { return y(d['AVG']); })
    .startAngle(function(d) { return x(d.COUNTRY); })
    .endAngle(function(d) { return x(d.COUNTRY) + x.bandwidth(); })
    .padAngle(0.01)
    .padRadius(innerRadius))
    .on("mouseover", mouseover)
    //.on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("text-anchor", function(d) { return (x(d.COUNTRY) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
      .attr("transform", function(d) { return "rotate(" + ((x(d.COUNTRY) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['AVG'])+10) + ",0)"; })
      .append("text")
      .text(function(d){return(d.COUNTRY)})
      .attr("transform", function(d) { return (x(d.COUNTRY) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
      .style("font-size", "15px")
      .style("fill", "black")
      .attr("alignment-baseline", "middle")
      .on("mouseover", mouseover)
      //.on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

});
