$(document).ready(function(){
  var politician_results;
  
  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();


    if($("#zip-search-form input").val().length === 5) {
        var zipcode = $("#zip-search-form input").val();
        console.log(zipcode);
        var politicians = new PoliticiansCollection({ zipcode: zipcode });

        politician_results = politicians;

        var searchResultView = new PoliticianSearchResultsView({collection: politicians});

        searchResultView.render();
        $("#search-container").html(searchResultView.el);
        $('.detail').hide();
        politicians.fetch({reset: true});
    }
  });



  $("#search-container").on("click", ".politician-result", function(event){
    event.preventDefault();
    //Steps:
    //Pull biocode out of results from zipcode search and replace the above line
    var bio_id = $(this).children("span").text()

    var request = $.ajax({
        url: '/politician/' + bio_id
    });

    request.done(function(response){
        var allDetailsView = new AllDetailsView({model: response});
        allDetailsView.render();
        $(".search-results").hide();
        $("#front-page-header").css("margin-top", "1%");
        $("#results-view").html(allDetailsView.el);
        $(document).foundation('accordion', 'reflow'); 
    });

    // var request = $.ajax({
    //     url: '/bills/' + bio_id
    // });

    // request.done(function(response)

    var request = $.ajax({
      url: '/sectors/' + bio_id,
      type: 'get',
      dataType: 'json',
    });
    // D3 DONUT CHART

    request.done(function(response) {
      (function(d3) {
        'use strict';

      // parses response  
      var dataset = [];
      for (var i = 0; i < response.length; i++) {
        dataset.push({amount: response[i].amount, sector: response[i].sector, count: response[i].count});
        console.log(response[i]);
      }

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;                                  
        var legendSpacing = 4;                                    
        var color = d3.scale.category20b();

        var svg = d3.select('#chart')
          .append('svg')
          .attr('width', 650)
          .attr('height', 650)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return d.amount; })
          .sort(null);

        var tooltip = d3.select('#chart')                               
          .append('div')                                                
          .attr('class', 'tooltip');                                    
                      
        tooltip.append('div')                                           
          .attr('class', 'sector');                                      
             
        tooltip.append('div')                                           
          .attr('class', 'amount');                                      
        tooltip.append('div')                                           
          .attr('class', 'percent');

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.sector);
          });

        path.on('mouseover', function(d) {                            
          var total = d3.sum(dataset.map(function(d) {                
            return d.amount;                                           
        }));        
          console.log(d.data.count)
          var percent = Math.round(1000 * d.data.amount / total) / 10; 

            tooltip.select('.sector').html(d.data.sector);
            tooltip.select('.count').html(d.data.count);                 
            tooltip.select('.amount').html('$' + d.data.amount);               
            tooltip.select('.percent').html(percent + '%');             
            tooltip.style('display', 'block');                          
          });                                                           
          
          path.on('mouseout', function() {                              
            tooltip.style('display', 'none');                           
          });                                                           
  
          path.on('mousemove', function(d) {                            
            tooltip.style('top', (d3.event.pageY + -140) + 'px')          
              .style('left', (d3.event.pageX + 10) + 'px');             
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
          .style('stroke', color);                                
          
        legend.append('text')                                     
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize - legendSpacing)              
          .text(function(d) { return d; });                       
      })(window.d3);
    });
  });
});
