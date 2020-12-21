/* globals alert, document, d3, console */
// These keep JSHint quiet if you're using it

// Load initial data set
window.onload = changeData;

// Add event listeners for changing data
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("dataset").addEventListener("change", changeData);
    document.getElementById("random").addEventListener("change", randomSubset);
});

function update(error, data) {
    if (error !== null) {
        alert("Couldn't load the dataset!");
    } else {
        // D3 loads all CSV data as strings;
        // while Javascript is pretty smart
        // about interpreting strings as
        // numbers when you do things like
        // multiplication, it will still
        // treat them as strings where it makes
        // sense (e.g. adding strings will
        // concatenate them, not add the values
        // together, or comparing strings
        // will do string comparison, not
        // numeric comparison).

        // We need to explicitly convert values
        // to numbers so that comparisons work
        // when we call d3.max()
        data.forEach(function(d) {
            d.a = parseInt(d.a);
            d.b = parseFloat(d.b);
        });
    }

    // The properties of the canvas
    let w = 206,
        h = 206,
        barPadding = 1.5;

    // Set up the scales
    let aScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.a;
        })])
        .range([0, h - 6]);
    let bScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.b;
        })])
        .range([0, h - 6]);
    let iScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([3, w - 3]);

    // TODO: PART II (you will also edit in PART IV)

    // TODO: Select and update the 'a' bar chart bars
    let bc1 = d3.select("#bc1")
        .select("g")
        .attr("transform", "translate(0 206) scale(1 -1)");

    // For the 'exit' subset
    bc1.selectAll(".bar1")
        .data(data)
        .exit()
        .remove();

    // For the 'enter' subset
    bc1.selectAll(".bar1")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * ((w - 5) / data.length) + 3;
        })
        .attr("y", 1)
        .attr("height", function(d) {
            return aScale(d.a);
        })
        .attr("width", w / data.length - barPadding)
        .attr("class", "bar1")
        .attr("id", function(d) {
            return "ID_a" + d.a;
        });

    // For the 'update' subset
    bc1.selectAll(".bar1")
        .data(data)
        .transition()
        .attr("x", function(d, i) {
            return i * ((w - 5) / data.length) + 3;
        })
        .attr("y", 1)
        .attr("height", function(d) {
            return aScale(d.a);
        })
        .attr("width", w / data.length - barPadding)
        .attr("class", "bar1");

    // TODO: Select and update the 'b' bar chart bars
    let bc2 = d3.select("#bc2")
        .select("g")
        .attr("transform", "translate(0 206) scale(1 -1)");

    // For the 'exit' subset
    bc2.selectAll(".bar2")
        .data(data)
        .exit()
        .remove();

    // For the 'enter' subset
    bc2.selectAll(".bar2")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * ((w - 5) / data.length) + 3;
        })
        .attr("y", 1)
        .attr("height", function(d) {
            return bScale(d.b);
        })
        .attr("width", w / data.length - barPadding)
        .attr("class", "bar2")
        .attr("id", function(d) {
            return "ID_b" + d.b;
        });

    // For the 'update' subset
    bc2.selectAll(".bar2")
        .data(data)
        .transition()
        .attr("x", function(d, i) {
            return i * ((w - 5) / data.length) + 3;
        })
        .attr("y", 1)
        .attr("height", function(d) {
            return bScale(d.b);
        })
        .attr("width", w / data.length - barPadding)
        .attr("class", "bar2");

    // TODO: Select and update the 'a' line chart path using this line generator
    let aLineGenerator = d3.line()
        .x(function(d, i) {
            return iScale(i);
        })
        .y(function(d) {
            return aScale(d.a);
        });

    let line1 = aLineGenerator(data);

    let lc1 = d3.select("#lc1")
        .select("g")
        .attr("transform", "translate(0 206) scale(1 -1)");

    // For the 'exit' subset
    lc1.selectAll(".line1")
        .data([data])
        .exit()
        .remove();

    lc1.selectAll(".circle1")
        .data(data)
        .exit()
        .remove();

    // For the 'enter' subset
    lc1.selectAll(".line1")
        .data([data])
        .enter()
        .append("path")
        .attr("d", line1)
        .attr("class", "line1");

    lc1.selectAll(".circle1")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return aScale(d.a);
        })
        .attr("r", 2)
        .attr("class", "circle1");

    // For the 'update' subset
    lc1.selectAll(".line1")
        .data([data])
        .transition()
        .attr("d", line1)
        .attr("class", "line1");

    lc1.selectAll(".circle1")
        .data(data)
        .transition()
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return aScale(d.a);
        })
        .attr("r", 2)
        .attr("class", "circle1");

    // TODO: Select and update the 'b' line chart path (create your own generator)
    let bLineGenerator = d3.line()
        .x(function(d, i) {
            return iScale(i);
        })
        .y(function(d) {
            return bScale(d.b);
        });

    let line2 = bLineGenerator(data);

    let lc2 = d3.select("#lc2")
        .select("g")
        .attr("transform", "translate(0 206) scale(1 -1)");

    // For the 'exit' subset
    lc2.selectAll(".line2")
        .data([data])
        .exit()
        .remove();

    lc2.selectAll(".circle2")
        .data(data)
        .exit()
        .remove();

    // For the 'enter' subset
    lc2.selectAll(".line2")
        .data([data])
        .enter()
        .append("path")
        .attr("d", line2)
        .attr("class", "line2");

    lc2.selectAll(".circle2")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return bScale(d.b);
        })
        .attr("r", 2)
        .attr("class", "circle2");

    // For the 'update' subset
    lc2.selectAll(".line2")
        .data([data])
        .transition()
        .attr("d", line2)
        .attr("class", "line2");

    lc2.selectAll(".circle2")
        .data(data)
        .transition()
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return bScale(d.b);
        })
        .attr("r", 2)
        .attr("class", "circle2");

    // TODO: Select and update the 'a' area chart path using this line generator
    let aAreaGenerator = d3.area()
        .x(function(d, i) {
            return iScale(i);
        })
        .y0(0)
        .y1(function(d) {
            return aScale(d.a);
        });

    let area1 = aAreaGenerator(data);

    let ac1 = d3.select("#ac1")
        .select("g")
        .attr("transform", "translate(0 206) scale(1 -1)");

    // For the 'exit' subset
    ac1.selectAll(".area1")
        .data([data])
        .exit()
        .remove();

    ac1.selectAll(".circle1")
        .data(data)
        .exit()
        .remove();

    // For the 'enter' subset
    ac1.selectAll(".area1")
        .data([data])
        .enter()
        .append("path")
        .attr("d", area1)
        .attr("class", "area1");

    ac1.selectAll(".circle1")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return aScale(d.a);
        })
        .attr("r", 2)
        .attr("class", "circle1");

    // For the 'update' subset
    ac1.selectAll(".area1")
        .data([data])
        .transition()
        .attr("d", area1)
        .attr("class", "area1");

    ac1.selectAll(".circle1")
        .data(data)
        .transition()
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return aScale(d.a);
        })
        .attr("r", 2)
        .attr("class", "circle1");

    // TODO: Select and update the 'b' area chart path (create your own generator)
    let bAreaGenerator = d3.area()
        .x(function(d, i) {
            return iScale(i);
        })
        .y0(0)
        .y1(function(d) {
            return bScale(d.b);
        });

    let area2 = bAreaGenerator(data);

    let ac2 = d3.select("#ac2")
        .select("g")
        .attr("transform", "translate(0 206) scale(1 -1)");

    // For the 'exit' subset
    ac2.selectAll(".area2")
        .data([data])
        .exit()
        .remove();

    ac2.selectAll(".circle2")
        .data(data)
        .exit()
        .remove();

    // For the 'enter' subset
    ac2.selectAll(".area2")
        .data([data])
        .enter()
        .append("path")
        .attr("d", area2)
        .attr("class", "area2");

    ac2.selectAll(".circle2")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return bScale(d.b);
        })
        .attr("r", 2)
        .attr("class", "circle2");

    // For the 'update' subset
    ac2.selectAll(".area2")
        .data([data])
        .transition()
        .attr("d", area2)
        .attr("class", "area2");

    ac2.selectAll(".circle2")
        .data(data)
        .transition()
        .attr("cx", function(d, i) {
            return iScale(i);
        })
        .attr("cy", function(d) {
            return bScale(d.b);
        })
        .attr("r", 2)
        .attr("class", "circle2");

    // TODO: Select and update the scatterplot points
    let sp = d3.select("#sp")
        .select("g")
        .attr("transform", "translate(0 206) scale(1 -1)");

    //For the 'exit' subset
    sp.selectAll("circle")
        .data(data)
        .exit()
        .remove();

    // For the 'enter' subset
    sp.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return aScale(d.a);
        })
        .attr("cy", function(d) {
            return bScale(d.b);
        })
        .attr("r", 2)
        .attr("class", "circleSP")
        .attr("id", function(d) {
            return "ID_a" + d.a + "ID_b" + d.b;
        });

    // For the 'update' subset
    sp.selectAll("circle")
        .data(data)
        .transition()
        .attr("cx", function(d) {
            return aScale(d.a);
        })
        .attr("cy", function(d) {
            return bScale(d.b);
        })
        .attr("r", 2)
        .attr("class", "circleSP");

    // TODO: PART III
    // Highlight elements
    bc1.selectAll(".bar1")
        .data(data)
        .on("mouseover", highlightA)
        .on("mouseout", defaultA);

    bc2.selectAll(".bar2")
        .data(data)
        .on("mouseover", highlightB)
        .on("mouseout", defaultB);

    lc1.selectAll(".circle1")
        .data(data)
        .on("mouseover", highlightA)
        .on("mouseout", defaultA);

    lc2.selectAll(".circle2")
        .data(data)
        .on("mouseover", highlightB)
        .on("mouseout", defaultB);

    ac1.selectAll(".circle1")
        .data(data)
        .on("mouseover", highlightA)
        .on("mouseout", defaultA);

    ac2.selectAll(".circle2")
        .data(data)
        .on("mouseover", highlightB)
        .on("mouseout", defaultB);

    // Actions for the scatterplot
    sp.selectAll(".circleSP")
        .data(data)
        .on("click", printCoordinates)
        .on("mouseover", function(d) {
            showTooltip(d);
            highlightA(d);
            highlightB(d);
        })
        .on("mouseout", function(d) {
            hideTooltip(d);
            defaultA(d);
            defaultB(d);
        });
}

function changeData() {
    // Load the file indicated by the select menu
    let dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        randomSubset();
    } else {
        console.log("Data Set from file " + dataFile + " loaded.");
        d3.csv('./data/' + dataFile + '.csv', update);
    }
}

function randomSubset() {
    // Load the file indicated by the select menu,
    // and then slice out a random chunk before
    // passing the data to update()
    let dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        console.log("Random Data Set created.");
        d3.csv('./data/' + dataFile + '.csv', function(error, data) {
            let subset = [];
            data.forEach(function(d) {
                if (Math.random() > 0.5) {
                    subset.push(d);
                }
            });
            update(error, subset);
        });
    } else {
        changeData();
    }
}

function getXMouse() {
    // Get the X position of the mouse
    return event.pageX;
}

function getYMouse() {
    // Get the Y position of the mouse
    return event.pageY;
}

function printCoordinates(d) {
    // Print the scatterplot point's coordinates to console
    console.log("x: " + d.a);
    console.log("y: " + d.b);
}

function showTooltip(d) {
    // Show the tooltip on mouseover
    let xPosition = getXMouse() + 10;
    let yPosition = getYMouse() + 10;

    d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px");

    d3.select("#tooltip")
        .select("#xCoordinate")
        .text("x: " + d.a);

    d3.select("#tooltip")
        .select("#yCoordinate")
        .text("y: " + d.b);

    d3.select("#tooltip")
        .classed("hidden", false);
}

function hideTooltip() {
    // Hide the tooltip on mouseout
    d3.select("#tooltip").classed("hidden", true);
}

function highlightA(d) {
    // Highlight the bar on the bar chart
    d3.select("#bc1")
        .select("g")
        .selectAll(".bar1")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "royalblue");
    // Highlight the point on the line chart
    d3.select("#lc1")
        .select("g")
        .selectAll(".circle1")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "visible")
        .style("fill", "royalblue")
        .attr("r", "4");
    // Highlight the point on the area chart
    d3.select("#ac1")
        .select("g")
        .selectAll(".circle1")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "visible")
        .style("fill", "royalblue")
        .attr("r", "4");
    // Highlight the point on the scatterplot
    d3.select("#sp")
        .select("g")
        .selectAll(".circleSP")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "royalblue")
        .attr("r", "4");
}

function defaultA(d) {
    // Set the style to default
    // The bar
    d3.select("#bc1")
        .select("g")
        .selectAll(".bar1")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "");
    // The point of the line chart
    d3.select("#lc1")
        .select("g")
        .selectAll(".circle1")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "")
        .style("fill", "")
        .attr("r", "2");
    // The point of the area chart
    d3.select("#ac1")
        .select("g")
        .selectAll(".circle1")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "")
        .style("fill", "")
        .attr("r", "2");
    // The point of the scatterplot
    d3.select("#sp")
        .select("g")
        .selectAll(".circleSP")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "")
        .attr("r", "2");
}

function highlightB(d) {
    // Highlight the bar on the bar chart
    d3.select("#bc2")
        .select("g")
        .selectAll(".bar2")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "royalblue");
    // Highlight the point on the line chart
    d3.select("#lc2")
        .select("g")
        .selectAll(".circle2")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "visible")
        .style("fill", "royalblue")
        .attr("r", "4");
    // Highlight the point on the area chart
    d3.select("#ac2")
        .select("g")
        .selectAll(".circle2")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "visible")
        .style("fill", "royalblue")
        .attr("r", "4");
    // Highlight the point on the scatterplot
    d3.select("#sp")
        .select("g")
        .selectAll(".circleSP")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "royalblue")
        .attr("r", "4");
}

function defaultB(d) {
    // Set the style to default
    // The bar
    d3.select("#bc2")
        .select("g")
        .selectAll(".bar2")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "");
    // The point of the line chart
    d3.select("#lc2")
        .select("g")
        .selectAll(".circle2")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "")
        .style("fill", "")
        .attr("r", "2");
    // The point of the area chart
    d3.select("#ac2")
        .select("g")
        .selectAll(".circle2")
        .filter(function(dd) {
            return d === dd;
        })
        .style("visibility", "")
        .style("fill", "")
        .attr("r", "2");
    // The point of the scatterplot
    d3.select("#sp")
        .select("g")
        .selectAll(".circleSP")
        .filter(function(dd) {
            return d === dd;
        })
        .style("fill", "")
        .attr("r", "2");
}
