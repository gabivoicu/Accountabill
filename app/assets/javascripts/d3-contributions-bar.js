
//-------------------------- Contributor Bar Graph ---------------------------//

function renderContributorBarGraph(response) {
  var w = 600;
  var h = 250;

  var dataset = [];
  for (var i = 0; i < response.length; i++) {
    dataset.push({name: response[i].name, total_amount: response[i].total_amount });
  }


  window.dataset = dataset;

  var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, w], 0.05);

  var yScale = d3.scale.linear()
    .range([0, h])
    .domain([0, d3.max(dataset, function(d) {return d.total_amount;})]);

  var name = function(d) {
    return d.name;
  };

  //Create SVG element
  var svg = d3.select("#top-contributor")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


  var tooltip = d3.select('#top-contributor')                               
    .append('div')                                                
    .attr('class', 'tooltip');                                    
                
  tooltip.append('div')                                           
    .attr('class', 'name');
  tooltip.append('div')                                           
    .attr('class', 'total');                                       

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //Create bars
  svg.selectAll("rect")
    .data(dataset, name)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return h - yScale(d.total_amount);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function(d) {
      return yScale(d.total_amount);
    })
    .attr("fill", "#A50026")

  //Tooltip
  .on("mouseover", function(d) {
    //Get this bar's x/y values, then augment for the tooltip
    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

    //Update Tooltip Position & value
    d3.select(".tooltip")
      tooltip.select('.name').html(d.name);
      tooltip.select('.total').html("$" + numberWithCommas(d.total_amount));
      tooltip.style('display', 'block');
  })
  .on('mouseout', function() {
    tooltip.style('display', 'none');
  })
  .on('mousemove', function(d) {
    tooltip.style('top', (d3.event.pageY + -510) + 'px')
      .style('left', (d3.event.pageX + -712) + 'px');
  });


  //Create labels
  svg.selectAll("text")
    .data(dataset, name)
    .enter()
    .append("text")
    .text(function(d) {
      return "$" + numberWithCommas(d.total_amount);
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function(d) {
      return h - yScale(d.total_amount) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
      .on("mouseover", function(d) {
    //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

    //Update Tooltip Position & value
    d3.select(".tooltip")
      tooltip.select('.name').html(d.name);
      tooltip.select('.total').html("$" + d.total_amount);
      tooltip.style('display', 'block');
      })
      .on('mouseout', function() {
       tooltip.style('display', 'none');
      })
      .on('mousemove', function(d) {
        tooltip.style('top', (d3.event.pageY + -510) + 'px')
          .style('left', (d3.event.pageX + -712) + 'px');
      });

var sortOrder = false;
var sortBars = function () {
  sortOrder = !sortOrder;

  sortItems = function (a, b) {
      if (sortOrder) {
          return a.total_amount - b.total_amount;
      }
      return b.total_amount - a.total_amount;
  };

  svg.selectAll("rect")
      .sort(sortItems)
      .transition()
      .delay(function (d, i) {
      return i * 50;
  })
      .duration(1000)
      .attr("x", function (d, i) {
      return xScale(i);
  });

  svg.selectAll('text')
      .sort(sortItems)
      .transition()
      .delay(function (d, i) {
      return i * 50;
      })
      .duration(1000)
      .text(function (d) {
      return d.total_amount;
      })
      .attr("text-anchor", "middle")
      .attr("x", function (d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr("y", function (d) {
      return h - yScale(d.total_amount) + 14;
      });
  };

  function randomSort() {

  svg.selectAll("rect")
    .sort(sortItems)
    .transition()
    .delay(function (d, i) {
      return i * 50;
    })
    .duration(1000)
    .attr("x", function (d, i) {
      return xScale(i);
    });

  svg.selectAll('text')
    .sort(sortItems)
    .transition()
    .delay(function (d, i) {
      return i * 50;
    })
    .duration(1000)
    .text(function (d) {
      return d.total_amount;
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function (d) {
      return h - yScale(d.total_amount) + 14;
    });
}
function reset() {
svg.selectAll("rect")
  .sort(function(a, b){
    return a.name - b.name;
  })
  .transition()
    .delay(function (d, i) {
      return i * 50;
    })
    .duration(1000)
    .attr("x", function (d, i) {
      return xScale(i);
    });

svg.selectAll('text')
  .sort(function(a, b){
    return a.name - b.name;
  })
  .transition()
  .delay(function (d, i) {
    return i * 50;
  })
  .duration(1000)
  .text(function (d) {
    return d.total_amount;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function (d) {
    return h - yScale(d.total_amount) + 14;
  });
  }
  }

