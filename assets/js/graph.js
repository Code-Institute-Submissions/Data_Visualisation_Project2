queue()
.defer(d3.csv, "assets/data/life_expectancy.csv")
.await(makeGraphs);

function makeGraphs(error, worldData){
  var ndx = crossfilter(worldData);

  worldData.forEach(function(d){
    d.GDP = parseInt(d.GDP);
    d.LifeExpectancy = parseInt(d.LifeExpectancy);
  })

  // I have to parse the data above for the scatter plots to render on my graph. If i dont parse in a string to integer(number) the dotts sit at the bottom of the graph

  show_country_selector(ndx);
  show_status_balance(ndx);
  show_average_life_expectancy(ndx);
  show_average_mortality_ofAdults(ndx);
  show_correlation_lifeLongeativity_gdp(ndx);
  
  dc.renderAll();
}

// SelectMenu
function show_country_selector(ndx){
  var countryDim = ndx.dimension( function (v){ return v.Country;
  });
    var country_selector = countryDim.group();
    var select = dc.selectMenu("#country-selector")
    .dimension(countryDim)
    .group(country_selector);

    select.title(function(d){
      return d.key;
    })
  }

// Pie Chart
function show_status_balance(ndx){

  var color_country = d3.scale.ordinal()
  .domain(["Developed", "Developing"])
  .range(["red", "black"]);

  var statusDim = ndx.dimension(
    function (v){
      return v.Status;
    }
  );
  var statusGroup = statusDim.group();

  dc.pieChart("#status_balance_pie")
  .dimension(statusDim)
  .group(statusGroup)
  .cx(195)
  .cy(175)
  .colors(color_country)
  .drawPaths(true)
  .innerRadius(60)
  .radius(150)
  .transitionDuration(750)
  // .attr("fill", function (d) {
  //          if (d == "Developed") {
  //              return "purple";
  //          } else if (d == "Developing") {
  //              return "black";
  //          } else {
  //              return "red"; // misc. to test if none above work
  //          }
  //      });

 // !!!! IMPORTANT -  why doesnt the above code work?
}

// Bar Graph

function show_average_life_expectancy(ndx){

  var color_country = d3.scale.ordinal()
  .domain(["Developed", "Developing"])
  .range(["red", "black"]);

  var statusDimension = ndx.dimension(dc.pluck("Status"));
  var average_life_age = statusDimension.group().reduce(
    function (p, v){
      p.count++;
      p.total += parseInt(v.LifeExpectancy);
      return p;
    },
    function(p, v){
      p.count--;
      if(p.count == 0) {
        p.total = 0;
      } else {
        p.total -= parseInt(v.LifeExpectancy);
      }
      return p;
    },
    function() {
      return {
        count: 0, total: 0
      };
    }
  );

  dc.barChart("#average_life_expectancy")
  .width(350)
  .height(350)
  .colors(color_country)
  .colorAccessor(function(d) {
    return d.key[0];
  })
  .margins({top: 10, right: 50, bottom: 30, left: 50})
  .dimension(statusDimension)
  .group(average_life_age)
  .valueAccessor(function (d) {
    if (d.value.count == 0){
      return 0;
    } else {
      return d.value.total / d.value.count;
    }
  })
  .transitionDuration(500)
  .x(d3.scale.ordinal())
  .xUnits(dc.units.ordinal)
  .elasticY(true)
  .xAxisLabel("Country Classification")
  .yAxisLabel("Life Expectancy Age")
  .yAxis().ticks(20);

}

// Bar Chart

function show_average_mortality_ofAdults(ndx) {

  var color_country = d3.scale.ordinal()
  .domain(["Developed", "Developing"])
  .range(["red", "black"]);

  var mortalityDim = ndx.dimension(dc.pluck("Status"));
  var percentage_adultDeath = mortalityDim.group().reduce(
    function (p, v) {
      p.count++;
      p.total += parseInt(v.AdultMortality);
      return p;
    },

    function (p, v) {
      p.count--;
      if (p.count == 0){
        p.total = 0
      } else {
        p.total -= parseInt(v.AdultMortality);
      }
      return p;
    },
    function () {
      return {
        count: 0, total: 0
      };
    }
  );

  dc.barChart("#average_adult_mortality")
    .width(350)
    .height(350)
    .colors(color_country)
    .margins({ top: 10, right: 50, bottom: 30, left: 50})
    .dimension(mortalityDim)
    .group(percentage_adultDeath)
    .valueAccessor( function (d) {
      if (d.value.count == 0){
      return 0;
      } else {
        return d.value.total / d.value.count; // graph didnt render as i forgot to place return here. Important!!
      }
    })
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel("Country Status")
    .yAxisLabel("Adult death ratio")
    .yAxis().ticks(20);

}

function show_correlation_lifeLongeativity_gdp(ndx){
  var color_country = d3.scale.ordinal()
  .domain(["Developed", "Developing"])
  .range(["red", "black"]);
  
  var gdpDim = ndx.dimension(dc.pluck("GDP"));
  //var gdpDim = ndx.dimension(function(d) {
    //return parseInt(d.GDP);
  //})

  var gdp_age = ndx.dimension(function (d) {
    return [d.GDP, d.LifeExpectancy, d.Country, d.Status];// The positioning of what goes here is important, first one (gdp) is x axis and second one lifeExp is y axis 
  });
  var age_gdp_correlation = gdp_age.group();

  var minGdp = gdpDim.bottom(1)[0].GDP;
  var maxGdp = gdpDim.top(1)[0].GDP;

  dc.scatterPlot("#gdp_lifeExpectancy")
    .width(900)
    .height(500)
    .x(d3.scale.linear().domain([0, 90000])) // you can even put your own numbers here instead of min/max values
    .y(d3.scale.linear().domain([50, 90]))
    .brushOn(false)
    .symbolSize(8)
    .clipPadding(10)
    .yAxisLabel("Life Expectancy")
    .xAxisLabel("GDP")
    .title(function(d) {
      return d.key[2];
    })
    .dimension(gdpDim)
    .group(age_gdp_correlation)
    .colors(color_country)
    .colorAccessor(function(d) {
       return d.key[3];
    })
    .margins({top: 70, right: 50, bottom: 75, left: 75})
    .transitionDuration(750);

}

















