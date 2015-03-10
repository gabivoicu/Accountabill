function renderPoliticianDetails(data){
  var allDetailsView = new AllDetailsView({model: data});
  allDetailsView.render();
  $("#results-view").html(allDetailsView.el);
  Transition.searchToDetail();
}



//------------------------ Contributor Types Graph ------------------------//

function renderContributorTypes(bio_id, data) {
    var margin = {top: 8, right: 15, bottom: 20, left: 200},
    width = 700 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

    var chart = d3.bullet()
    .width(width)
    .height(height);

    d3.json(("/contributor_types/" + bio_id + ".json"), function(error, data) {

    // parses response  
    var dataset = [];
    for (var i = 0; i < data.length; i++) {
      dataset.push({"title": data[i].title,"subtitle":"US$, in thousands","ranges":[2500],"count": data[i].count,"total_amount":data[i].total_amount,"measures":[(data[i].total_amount/1000)],"markers":[(data[i].total_amount/1000)]});
    }


    var svg = d3.select("#contributor-types").selectAll("svg")
      .data(dataset)
      .enter()
      .append("svg")
      .attr("class", "bullet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(chart);

      var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + height / 2 + ")");

      title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });

      title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });

      var tooltip = d3.select('#contributor-types')                               
        .append('div')                                                
        .attr('class', 'tooltip');

      tooltip.append('div')                                           
        .attr('class', 'amount');

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

      svg.on('mouseover', function(d) {
        tooltip.select('.amount').html('$' + numberWithCommas(d.total_amount) + ' total');
        tooltip.style('display', 'block');
      });

      svg.on('mouseout', function() {                              
        tooltip.style('display', 'none');                           
      });
      
      svg.on('mousemove', function(d) {                            
        tooltip.style('top', (d3.event.pageY + -485) + 'px')          
          .style('left', (d3.event.pageX + -712) + 'px');             
      }); 

    });
  }



//-------------------------- Sector Graph ---------------------------//

function renderSectorDonut(response) {
  (function(d3) {
    'use strict';

    // parses response
    var dataset = [];
    for (var i = 0; i < response.length; i++) {
      dataset.push({amount: response[i].amount, sector: response[i].sector, count: response[i].count});
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
      .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"]);

    var svg = d3.select('#sector-chart')
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

    var tooltip = d3.select('#sector-chart')
      .append('div')
      .attr('class', 'tooltip');

    tooltip.append('div')
      .attr('class', 'sector');
    tooltip.append('div')
      .attr('class', 'count');
    tooltip.append('div')
      .attr('class', 'amount');
    tooltip.append('div')
      .attr('class', 'percent');

    var path = svg.selectAll('graph_path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'donut-slice')
      .attr('fill', function(d, i) {
        return color(d.data.sector);
      })
      .each(function(d) { this._current = d; }); 

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    path.on('mouseover', function(d) {
      var total = d3.sum(dataset.map(function(d) {
        return (d.enabled) ? d.amount : 0; 
      }));
      
      var percent = Math.round( 1000 * d.data.amount / total ) / 10;

      tooltip.select('.sector').html(d.data.sector);
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
      .on('click', function(sector) {                            
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
        if (d.sector === sector) d.enabled = enabled;           
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

      legend.on('mouseover', function(d) {
      var total = d3.sum(dataset.map(function(d) {
        return (d.enabled) ? d.count : 0; 
      }));
      

      // start hover over box for legend
      // var percent = Math.round(d.amount / total) / 10;

      // tooltip.select('.sector').html(d.sector);
      // tooltip.select('.count').html(d.count + ' contributors');
      // tooltip.select('.amount').html('$' + d.amount);
      // tooltip.select('.percent').html(percent + '% of total');
      // tooltip.style('display', 'block');

      // svg.selectAll(".donut-slice").style('opacity','.6')
      // d3.select(this).style('opacity','1.0')
    });

    legend.on('mouseout', function() {
      tooltip.style('display', 'none');
      // svg.selectAll(".donut-slice").style('opacity','1.0')
    });

    legend.on('mousemove', function(d) {
      tooltip.style('top', (d3.event.pageY + -530) + 'px')
        .style('left', (d3.event.pageX + -712) + 'px');
    });                                                       

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; });
  })(window.d3);
}



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



//-------------------------- Bills ---------------------------//

function renderBills(response) {
  for (var i = 0; i < response.length; i++) {
    $("#bills-listing").append("<span id='bill'><p>Bill Number " + response[i].bill_id + ": <a target='_blank' href='" + response[i].open_congress + "'>" + response[i].official_title + "</a></p></span>")
  }
}




//-------------------------- Ajax Calls ---------------------------//

function renderPolitician(bio_id) {
  var request = $.ajax({
      url: '/politician/' + bio_id
  });
  var sector_request = $.ajax({
    url: '/sectors/' + bio_id,
    type: 'get',
    dataType: 'json',
  });
  var contributor_request = $.ajax({
    url: '/contributions/' + bio_id,
    type: 'get',
    dataType: 'json',
  });
  var industry_request = $.ajax({
    url: '/industries/' + bio_id,
    type: 'get',
    dataType: 'json',
  });

  var bills_request = $.ajax({
    url: '/bills/' + bio_id,
    type: 'get',
    dataType: 'json'
  })



//-------------------------- Render Bio ---------------------------//

  request.done(renderPoliticianDetails)
  request.done(function(response) { renderContributorTypes(bio_id, response) });
  sector_request.done(renderSectorDonut);
  bills_request.done(renderBills);
  contributor_request.done(renderContributorBarGraph);
  industry_request.done(renderIndustryDonut);
}
