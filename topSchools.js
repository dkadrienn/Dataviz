d3.csv("topsulik.csv", function(data){   
    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
    top: 10,
    right: 50,
    bottom: 50,
    left: 280
    };

    var width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

    var svg = d3.select("#topsch").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.AVG;
    })]);
        
    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.NR + ". " + d.SHORTSCHOOLNAME + ", " +d.LOCATION ;
    }));

    //make y axis to show bar LOCATIONs
    var yAxis = d3.svg.axis()
        .scale(y)
        //no tick marks
        .tickSize(0)
        .orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g");

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.NR + ". " + d.SHORTSCHOOLNAME + ", " +d.LOCATION);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.AVG);
    });

    //add a AVG label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.NR + ". " + d.SHORTSCHOOLNAME + ", " +d.LOCATION) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d.AVG)+3;
        })
        .text(function (d) {
            return d.AVG;
        });
});