queue()
  .defer(d3.csv, "assets/data/life_expectancy.csv")
  .await(makeGraphs);

function makeGraphs(error, worldData) {
  var ndx = crossfilter(worldData);

  worldData.forEach(function (d) {
    d.GDP = parseInt(d.GDP);
    d.LifeExpectancy = parseInt(d.LifeExpectancy);
    d.Schooling = parseInt(d.Schooling);
    d.AdultMortality = parseInt(d.AdultMortality);
  })

  // In order for the data visualization to display accurately, i must parse the data in the data file to an integer(number) from a string.

  show_country_selector(ndx);
  show_status_balance(ndx);
  show_average_life_expectancy(ndx);
  show_average_mortality_ofAdults(ndx);
  show_correlation_lifeLongeativity_schooling(ndx);

  dc.renderAll();
}

// SelectMenu

function show_country_selector(ndx) {
  var countryDim = ndx.dimension(function (v) {
    return v.Country;
  });
  var country_selector = countryDim.group();
  var select = dc.selectMenu("#country-selector")
    .dimension(countryDim)
    .group(country_selector);

  select.title(function (d) {
    return d.key;
  })
};

// Pie Chart

function show_status_balance(ndx) {

  var color_country = d3.scale.ordinal()
    .domain(["Developed", "Developing"])
    .range(["#158CBA", "#07c98fb0"]);

  var statusDim = ndx.dimension(
    function (v) {
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

function show_average_life_expectancy(ndx) {

  var statusDimension = ndx.dimension(dc.pluck("Status"));
  var average_life_age = statusDimension.group().reduce(
    function (p, v) {
      p.count++;
      p.total += parseInt(v.LifeExpectancy);
      return p;
    },
    function (p, v) {
      p.count--;
      if (p.count == 0) {
        p.total = 0;
      } else {
        p.total -= parseInt(v.LifeExpectancy);
      }
      return p;
    },
    function () {
      return {
        count: 0, total: 0
      };
    }
  );

  dc.barChart("#average_life_expectancy")
    .width(350)
    .height(350)
    .margins({ top: 10, right: 50, bottom: 50, left: 50 })
    .dimension(statusDimension)
    .group(average_life_age)
    .valueAccessor(function (d) {
      if (d.value.count == 0) {
        return 0;
      } else {
        return d.value.total / d.value.count;
      }
    })
    // The valueAccessor outputs the average age
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel("Country Status")
    .yAxisLabel("Life Expectancy Age")
    .yAxis().ticks(20);

}

// Bar Chart

function show_average_mortality_ofAdults(ndx) {

  var mortalityDim = ndx.dimension(dc.pluck("Status"));

  var mort_status = ndx.dimension(function (d) {
    return [d.Status, d.LifeExpectancy];
  });
  var percentage_adultDeath = mortalityDim.group().reduce(
    function (p, v) {
      p.count++;
      p.total += parseInt(v.AdultMortality);
      return p;
    },

    function (p, v) {
      p.count--;
      if (p.count == 0) {
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
    .margins({ top: 10, right: 50, bottom: 50, left: 50 })
    .dimension(mortalityDim)
    .group(percentage_adultDeath)
    .valueAccessor(function (d) {
      if (d.value.count == 0) {
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
    .yAxisLabel("Adult Mortality Per Thousand")
    .yAxis().ticks(20);

}

function show_correlation_lifeLongeativity_schooling(ndx) {

  var color_country = d3.scale.ordinal()
    .domain(["Developed", "Developing"])
    .range(["#158CBA", "#07c98fb0"]);

  var SchoolingDim = ndx.dimension(dc.pluck("Schooling"));

  var Schooling_age = ndx.dimension(function (d) {
    return [d.Schooling, d.LifeExpectancy, d.Country, d.Status];// The positioning of what goes here is important, first one (gdp) is x axis and second one lifeExp is y axis 
  });
  var Schooling_age_correlation = Schooling_age.group();

  var minSchooling = SchoolingDim.bottom(1)[0].Schooling;
  var maxSchooling = SchoolingDim.top(1)[0].Schooling;

  dc.scatterPlot("#gdp_lifeExpectancy")
    .width(900)
    .height(500)
    .x(d3.scale.linear().domain([4, maxSchooling])) // you can even put your own numbers here instead of min/max values
    .y(d3.scale.linear().domain([50, 90]))
    .brushOn(false)
    .symbolSize(8)
    .clipPadding(10)
    .yAxisLabel("Life Expectancy")
    .xAxisLabel("Schooling in Years")
    .title(function (d) {
      return d.key[2];
    })
    .dimension(SchoolingDim)
    .group(Schooling_age_correlation)
    .colors(color_country)
    .colorAccessor(function (d) {
      return d.key[3];
    })
    .margins({ top: 70, right: 50, bottom: 70, left: 70 })
    .transitionDuration(750);

}

















