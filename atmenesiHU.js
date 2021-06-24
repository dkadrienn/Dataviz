//set up svg using margin conventions - we'll need plenty of room on the left for labels


var svg = d3.select("#hu").append("svg"),
    margin = {top: 20,right: 20,bottom: 30,left: 40};
    width = +svg.attr("width", margin.left - margin.right),
    height = +svg.attr("height", margin.bottom - margin.top);

var x = d3.scaleBand().rangeRound([10, width]).paddingInner(0.4),
y = d3.scaleLinear().rangeRound([height, 20]);

svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

svg.append("g")
      .call(xAxis);

svg.append("g")
      .call(yAxis);

data = Object.assign(d3.csvParse(await FileAttachment("atmenesiHU.csv").text(), ({year, value}) => ({year: year, value: +value})).sort((a, b) => d3.descending(a.value, b.value)), {format: "%", y: "↑ Átmenési arány"})