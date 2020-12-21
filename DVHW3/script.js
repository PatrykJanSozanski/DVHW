// Global var for FIFA world cup data
var allWorldCupData;
var data;
var projection;
var presentedWorldCup;

/**
 * Render and update the bar chart based on the selection of the data type in the drop-down box
 *
 * @param selectedDimension a string specifying which dimension to render in the bar chart
 */
function createBarChart(selectedDimension) {

    // Print selected dimension to console
    console.log("Selected dimension: " + selectedDimension);

    // Select the necessary attributes for the bar chart
    // depending on the selected dimension
    switch (selectedDimension) {
        case "goals":
            data = allWorldCupData.map(function(d) {
                return {
                    year: d.year,
                    dimensionAttr: d.goals
                }
            });
            break;
        case "matches":
            data = allWorldCupData.map(function(d) {
                return {
                    year: d.year,
                    dimensionAttr: d.matches
                }
            });
            break;
        case "attendance":
            data = allWorldCupData.map(function(d) {
                return {
                    year: d.year,
                    dimensionAttr: d.attendance
                }
            });
            break;
        case "teams":
            data = allWorldCupData.map(function(d) {
                return {
                    year: d.year,
                    dimensionAttr: d.teams
                }
            });
            break;
        default:
            data = allWorldCupData.map(function(d) {
                return {
                    year: d.year,
                    dimensionAttr: d.attendance
                }
            });
            break;
    }

    // Print data subset to console
    console.log("Data for the bar chart: ");
    console.log(data);

    var svgBounds = d3.select("#barChart").node().getBoundingClientRect();
    var xpad = 100;
    var ypad = 70;

    // TODO: PART I

    // Create the x and y scales; make
    // sure to leave room for the axes
    // X scale
    var xScale = d3.scaleBand()
        .range([xpad, svgBounds.width]) // This is where the axis is placed: from 100px to 400px
        .padding(0.2)
        .domain(data.map(function(d) {
            return d.year;
        })
            .sort()) // This is what is written on the Axis: year dates

    // Y scale
    var yScale = d3.scaleLinear()
        .domain([0, 1.05 * d3.max(data, function(d) {
            return d.dimensionAttr;
        })]) // This is what is written on the Axis: from 0 to max(dimensionAttr)
        .range([svgBounds.height, ypad]); // This is where the axis is placed: from 0px to 330px

    // Create colorScale
    var colorScale = d3.scaleLinear()
        .domain([d3.min(data, function(d) {
            return d.dimensionAttr;
        }), d3.max(data, function(d) {
            return d.dimensionAttr;
        })])
        .range([60, 160])

    // Create the axes
    // X axis
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.format("d"));

    d3.select("#xAxis")
        .attr("transform", "translate(0, 330)")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    // Y axis
    var yAxis = d3.axisLeft()
        .scale(yScale);

    d3.select("#yAxis")
        .attr("transform", "translate(100, -70)")
        .transition()
        .call(yAxis);

    // Create the bars
    let bars = d3.select("#bars")
        .attr("transform", "translate(0 330) scale(1 -1)");

    // For the 'enter' subset
    bars.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return xScale(d.year);
        })
        .attr("y", 1)
        .attr("height", function(d) {
            return svgBounds.height - yScale(d.dimensionAttr);
        })
        .attr("width", xScale.bandwidth())
        .attr("class", "bar")
        .style("fill", function(dd) {
            return "rgb(" + (colorScale(dd.dimensionAttr)) + ", 20, 20)";
        })


    // For the 'update' subset
    bars.selectAll(".bar")
        .data(data)
        .transition()
        .attr("x", function(d) {
            return xScale(d.year);
        })
        .attr("y", 1)
        .attr("height", function(d) {
            return svgBounds.height - yScale(d.dimensionAttr);
        })
        .attr("width", xScale.bandwidth())
        .attr("class", "bar")
        .style("fill", function(dd) {
            return "rgb(" + (colorScale(dd.dimensionAttr)) + ", 20, 20)";
        })

    // TODO: PART II

    // Implement how the bars respond to click events
    // Call the necessary update functions for when a user clicks on a bar.
    bars.selectAll(".bar")
        .data(data)
        .on("click", function(d) {
            restoreStyle();
            highlightBar.call(this, d);
            updateInfo(d.year);
            updateMap(d.year);
        });

    // Color the selected bar to indicate it has been selected.
    function highlightBar(d) {
        this.style.fill = "rgb(256, 256, 256)"
        this.style.stroke = "rgb(" + (colorScale(d.dimensionAttr)) + ", 20, 20)";
        this.style.strokeWidth = "1";
    }

    // Make sure only the selected bar has this new color.
    function restoreStyle() {
        bars.selectAll(".bar")
            .data(data)
            .style("fill", function(d) {
                return "rgb(" + (colorScale(d.dimensionAttr)) + ", 20, 20)";
            })
            .style("stroke", "")
            .style("strokeWidth", "")
    }
}

/**
 *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
 *
 *  There are 4 attributes that can be selected:
 *  goals, matches, attendance and teams.
 */
function chooseData(v) {

    console.log("Chosen dimension: " + v);

    // TODO: PART I

    // Change the selected data when a user selects a different
    // menu item from the drop down.
    switch (v) {
        case "goals":
            createBarChart('goals');
            break;
        case "matches":
            createBarChart('matches');
            break;
        case "attendance":
            createBarChart('attendance');
            break;
        case "teams":
            createBarChart('teams');
            break;
        default:
            createBarChart('attendance');
            break;
    }
}

/**
 * Update the info panel to show info about the currently selected world cup
 *
 * @param oneWorldCup the currently selected world cup
 */
function updateInfo(oneWorldCup) {

    // TODO: PART III

    // Keep the data of the selected World Cup.
    presentedWorldCup = allWorldCupData.filter(function(row) {
        return row.year === oneWorldCup;
    })[0];

    // For the list of teams, create an list element for each team.
    let teams = "";
    for (let team in presentedWorldCup.teams_names) {
        teams += "<li>" + presentedWorldCup.teams_names[team] + " </li>";
    }

    // Update the text elements in the infoBox to reflect:
    // World Cup Title, host, winner, runner_up, and all participating teams that year
    // Select the appropriate ids to update the text content.
    document.getElementById("edition")
        .innerHTML = presentedWorldCup.EDITION;
    document.getElementById("host")
        .innerHTML = "<li>" + presentedWorldCup.host + " </li>";
    document.getElementById("winner")
        .innerHTML = "<li>" + presentedWorldCup.winner + " </li>";
    document.getElementById("silver")
        .innerHTML = "<li>" + presentedWorldCup.runner_up + " </li>";
    document.getElementById("teams")
        .innerHTML = teams;
}

/**
 * Renders and updates the map and the highlights on top of it
 *
 * @param world the json data with the shape of all countries
 */
function drawMap(world) {

    // (note that projection is global!
    // updateMap() will need it to add the winner/runner_up markers.)
    projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    // ******* TODO: PART IV *******

    // Define the path generator function
    let path = d3.geoPath(projection);

    // Draw the background (country outlines)
    let map = d3.select("#map");

    map.selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", path)

        // Assign an id to each country path to make it easier to select afterwards
        .attr("id", function(d) {
            return d.id;
        })

        // Assign to each country path the appropriate class
        .attr("class", "countries");

    // Make sure and add the gridlines to the map
    let graticule = d3.geoGraticule10();

    let grid = d3.select("#graticule");

    grid.append("path")
        .datum(graticule)
        .attr("d", path)
        .attr("class", "graticule");
}

/**
 * Clears the map
 */
function clearMap() {

    // TODO: PART V

    //Clear the map of any colors/markers
    let map = d3.select("#map");

    map.selectAll(".host")
        .transition()
        .attr("class", "countries");

    map.selectAll(".team")
        .transition()
        .attr("class", "countries");
}


/**
 * Update Map with info for a specific FIFA World Cup
 * @param worldcupData the data for one specific world cup
 */
function updateMap(worldcupData) {

    //Clear any previous selections;
    clearMap();

    // TODO: PART V

    // Get the coordinates of the winner and the runner up countries.
    var goldCoordinates = [{long: parseFloat(presentedWorldCup.WIN_LON), lat: parseFloat(presentedWorldCup.WIN_LAT)}]
    var silverCoordinates = [{long: parseFloat(presentedWorldCup.RUP_LON), lat: parseFloat(presentedWorldCup.RUP_LAT)}]

    // Add a marker for the winner and runner up to the map.
    let points = d3.select("#points");

    // For the enter subset
    points.selectAll(".gold")
        .data(goldCoordinates)
        .enter()
        .append("circle")
        .attr("class", "gold")
        .attr("r", "5")
        .attr("transform", function(d) {
            return "translate(" + projection([d.long, d.lat]) + ")";
        });

    // For the update subset
    points.selectAll(".gold")
        .data(goldCoordinates)
        .transition()
        .attr("transform", function(d) {
            return "translate(" + projection([d.long, d.lat]) + ")";
        });

    // For the enter subset
    points.selectAll(".silver")
        .data(silverCoordinates)
        .enter()
        .append("circle")
        .attr("class", "silver")
        .attr("r", "5")
        .attr("transform", function(d) {
            return "translate(" + projection([d.long, d.lat]) + ")";
        });

    // For the update subset
    points.selectAll(".silver")
        .data(silverCoordinates)
        .transition()
        .attr("transform", function(d) {
            return "translate(" + projection([d.long, d.lat]) + ")";
        });


    // Select the host country and change it's color accordingly.
    var hostId = presentedWorldCup.host_country_code;

    d3.select("#" + hostId)
        .transition()
        .attr("class", "host");

    // Iterate through all participating teams and change their color as well.
    for (let team in presentedWorldCup.teams_iso) {
        if (presentedWorldCup.teams_iso[team] !== hostId) {
            d3.select("#" + presentedWorldCup.teams_iso[team])
                .transition()
                .attr("class", "team");
        }
    }
}

/* DATA LOADING */

// This is where execution begins; everything
// above this is just function definitions
// (nothing actually happens)
// Load in json data to make map

d3.json("data/world.json", function(error, world) {
    if (error) {
        console.log(error);  //Log the error.
        throw error;
    }

    drawMap(world);
});


// Load CSV file
d3.csv("data/fifa-world-cup.csv", function(error, csv) {
    if (error) {
        console.log(error);  //Log the error.
        throw error;
    }

    csv.forEach(function(d) {

        // Convert numeric values to 'numbers'
        d.year = +d.YEAR;
        d.teams = +d.TEAMS;
        d.matches = +d.MATCHES;
        d.goals = +d.GOALS;
        d.avg_goals = +d.AVERAGE_GOALS;
        d.attendance = +d.AVERAGE_ATTENDANCE;

        //Lat and Lons of gold and silver medals teams
        d.win_pos = [+d.WIN_LON, +d.WIN_LAT];
        d.ru_pos = [+d.RUP_LON, +d.RUP_LAT];

        //Break up lists into javascript arrays
        d.teams_iso = d3.csvParse(d.TEAM_LIST).columns;
        d.teams_names = d3.csvParse(d.TEAM_NAMES).columns;

    });

    // Store csv data in a global variable
    allWorldCupData = csv;

    // Draw the Bar chart for the first time
    createBarChart('attendance');

    console.log(allWorldCupData);
});