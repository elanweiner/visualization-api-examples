(function() {
  var viz = {
    id: "highcharts_spiderweb",
    label: "Spiderweb",
    options: {
      chartName: {
        section: "Chart",
        label: "Chart Name",
        type: "string",
      },
      color_range: {
        type: "array",
        label: "Color Range",
        display: "colors",
        default: ["#dd3333", "#80ce5d", "#f78131", "#369dc1", "#c572d3", "#36c1b3", "#b57052", "#ed69af"],
      },
    },
    // Set up the initial state of the visualization
    create: function(element, config) {
      element.innerHTML = ""
    },
    // Render in response to the data or settings changing
    update: function(data, element, config, queryResponse) {
      

      let x = queryResponse.fields.dimension_like[0]
      let measures = queryResponse.fields.measure_like
      let xCategories = data.map(function(row) {return row[x.name].value})

      let series = measures.map(function(m) 

      let options = {
        colors: config.color_range,
        credits: {
          enabled: false
        },
        chart: {
          polar: true,
          type: 'line'
        },
        title: {text: config.chartName},
        xAxis: {
          categories: xCategories,
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          min: 0,
          labels: {
            format: '{value}'
          },
        },
        tooltip: {
          shared: true,
        },
        series: series,
      }
      let myChart = Highcharts.chart(element, options);
    }
  };
  looker.plugins.visualizations.add(viz);
}());
