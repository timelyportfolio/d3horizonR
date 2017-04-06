import {select} from 'd3-selection';
import {default as horizon} from "./src/horizon-chart.js";
import HTMLWidgets from "./global/htmlwidgets";

HTMLWidgets.widget({

  name: 'd3horizon',

  type: 'output',

  factory: function(el, width, height) {

    return {

      chart: null,

      renderValue: function(x) {
        var horizonChart;

        if(this.chart) {
          horizonChart = this.chart;
        } else {
          this.chart = horizonChart = horizon();
        }


        Object.keys(x.options).map(function(ky) {
          if(horizonChart[ky]) {
            try {
              horizonChart[ky](x.options[ky]);
            } catch(e) {
              //console.log('option ' + ky + "does not seem supported.");
            }
          }
        });

        // bad hack to fit chart by forcing step
        //  need to fix this
        horizonChart.step(el.getBoundingClientRect().width/x.data[0].length);

        var horizons = select(el).selectAll('.horizon')
          .data(x.data)
          .enter().append('div')
          .attr('class', 'horizon')
          .each(horizonChart);

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});

