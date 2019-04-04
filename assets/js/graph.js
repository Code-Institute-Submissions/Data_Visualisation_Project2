queue()
.defer(d3.csv, "assets/data/life_expectancy.csv")
.await(makeGraphs);

function makeGraphs(error, worldData){
  var ndx = crossfilter(worldData);

  show_country_selector(ndx);
  show_status_balance(ndx);
  show_average_life_expectancy(ndx);
  show_average_mortality_ofAdults(ndx);
  show_correlation_lifeLongeativity_gdp(ndx);
  dc.renderAll();
}

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

function show_status_balance(ndx){
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
  .drawPaths(true)
  .innerRadius(60)
  .radius(150)
  .transitionDuration(750);

}

function show_average_life_expectancy(ndx){
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

function show_average_mortality_ofAdults(ndx) {
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
  // color_country("Developed"); red
  // color_country("Developing"); black
  var gdpDim = ndx.dimension(dc.pluck("GDP"));
  var gdp_age = ndx.dimension(function(d) {
    return [d.GDP, d.Country, d.Status];
  });
  var age_gdp_correlation = gdp_age.group();

  var minGdp = gdpDim.bottom(1)[0].GDP;
  var maxGdp = gdpDim.top(1)[0].GDP;

  dc.scatterPlot("#gdp_lifeExpectancy")
    .width(800)
    .height(400)
    .x(d3.scale.linear().domain([minGdp, maxGdp]))
    .brushOn(false)
    .symbolSize(8)
    .clipPadding(10)
    .yAxisLabel("Life Expectancy")
    .xAxisLabel("GDP")
    .title(function(d) {
      return d.key[1];
    })
    .colorAccessor(function(d) {
      return d.key[3];
    })
    .colors(color_country)
    .dimension(gdp_age)
    .group(age_gdp_correlation)
    .margins({top: 10, right: 50, bottom: 75, left: 75})

}



















