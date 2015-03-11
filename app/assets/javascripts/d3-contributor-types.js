//------------------------ Contributor Types Graph ------------------------//

function renderContributorTypes(bio_id, data) {
    var margin = {top: 8, right: 15, bottom: 20, left: 90},
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


