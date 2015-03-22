//-------------------------- Industry Graph ---------------------------//

function renderIndustryDonut(response) {
    (function(d3) {
      'use strict';

    // parses response
    var dataset = [];
    for (var i = 0; i < response.length; i++) {
      dataset.push({amount: response[i].amount, name: response[i].name, count: response[i].count});
    }
    dataset.forEach(function(d) {
      d.count = +d.count;
      d.enabled = true;
    });

      var width = 360;
      var height = 360;
      var radius = Math.min(width, height) / 2;
      var donutWidth = 75;
      var legendRectSize = 18;
      var legendSpacing = 4;

      var color = d3.scale.ordinal()
        .range(["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"]);

      var svg = d3.select('#industry-chart')
        .append('svg')
        .attr('width', 650)
        .attr('height', 360)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var pie = d3.layout.pie()
        .value(function(d) { return d.amount; })
        .sort(null);

      var tooltip = d3.select('#industry-chart')
        .append('div')
        .attr('class', 'tooltip');

      tooltip.append('div')
        .attr('class', 'name');
      tooltip.append('div')
        .attr('class', 'count');
      tooltip.append('div')
        .attr('class', 'amount');
      tooltip.append('div')
        .attr('class', 'percent');

      var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'donut-slice')
      .attr('fill', function(d, i) {
        return color(d.data.name);
      })
      .each(function(d) { this._current = d; });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

    path.on('mouseover', function(d) {
      var total = d3.sum(dataset.map(function(d) {
        return (d.enabled) ? d.amount : 0;
      }));

      console.log(total)

      var percent = Math.round( 1000 * d.data.amount / total ) / 10;

      tooltip.select('.name').html(d.data.name);
      tooltip.select('.count').html(d.data.count + ' contributors');
      tooltip.select('.amount').html('$' + numberWithCommas(d.data.amount));
      tooltip.select('.percent').html(percent + '% of total');
      tooltip.style('display', 'block');

      svg.selectAll(".donut-slice").style('opacity','.6')
      d3.select(this).style('opacity','1.0')
    });

    path.on('mouseout', function() {
      tooltip.style('display', 'none');
      svg.selectAll(".donut-slice").style('opacity','1.0')
    });
        path.on('mousemove', function(d) {
          tooltip.style('top', (d3.event.pageY + -530) + 'px')
            .style('left', (d3.event.pageX + -712) + 'px');
        });

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset =  height * color.domain().length / 2;
          var horz = 12 * legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color)
          .on('click', function(name) {
            var rect = d3.select(this);
            var enabled = true;
            var totalEnabled = d3.sum(dataset.map(function(d) {
              return (d.enabled) ? 1 : 0;
            }));

            if (rect.attr('class') === 'disabled') {
              rect.attr('class', '');
            } else {
              if (totalEnabled < 2) return;
              rect.attr('class', 'disabled');
              enabled = false;
            }

            pie.value(function(d) {
              if (d.name === name) d.enabled = enabled;
              return (d.enabled) ? d.count : 0;
            });

            path = path.data(pie(dataset));

            path.transition()
              .duration(750)
              .attrTween('d', function(d) {
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                  return arc(interpolate(t));
                };
              });
          });

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; });
    })(window.d3);
  }
