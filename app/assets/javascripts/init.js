$(document).ready(function(){

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    if($("#zip-search-form input").val().length === 5) {
        var zipcode = $("#zip-search-form input").val();
        console.log(zipcode);
        var politicians = new PoliticiansCollection({ zipcode: zipcode });

        var searchResultView = new PoliticianSearchResultsView({collection: politicians});

        searchResultView.render();
        $("#search-container").html(searchResultView.el);
        $('.detail').hide();
        politicians.fetch({reset: true});
    }

  });



  $("#search-container").on("click", ".politician-result", function(event){
    event.preventDefault();
    // var bio_id = "A000014";
    //Steps:
    //Pull biocode out of results from zipcode search and replace the above line
    // var contributions = new ContributionsCollection({biocode: bio_id});
    // console.log(contributions);

    // var contributionView = new AllContributionsView({ collection: contributions });
    
    // contributionView.render();
    // contributions.fetch({ reset: true });

    var content = $(this).html();
    console.log(content.attributes)
    
    var allDetailsView = new AllDetailsView();
    allDetailsView.render();
    $(".search-results").hide();
    $("#front-page-header").css("margin-top", "1%");
    $("#results-view").html(allDetailsView.el);
    $(document).foundation('accordion', 'reflow');

  });



  $("#front-page-header").on("click", function(event){

    var request = $.ajax({
      url: '/contributions/K000360',
      type: 'get',
      datatype: 'json'
    });

    console.log(request)


    request.done(function(response) {
      console.log(response)
      (function(d3) {
        'use strict';
        var dataset = [ { name: 'Highfields Capital Management', total_amount: '52000.00' },
                        { name: 'NorPAC', total_amount: '49671.00' },
                        { name: 'Exelon Corp', total_amount: '29450.00', },
                        { name: 'Baupost Group', total_amount: '18200.00' },
                        { name: 'Mazzetta Co', total_amount: '15800.00' },
                        { name: 'Grosvenor Capital Management', total_amount: '15600.00' },
                        { name: 'SF Investments', total_amount: '15600.00' },
                        { name: 'KKR & Co', total_amount: '14000.00' },
                        { name: 'Citadel LLC', total_amount: '13000.00' },
                        { name: 'Hollister Inc', total_amount: '12700.00' } ];
        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;                                  // NEW
        var legendSpacing = 4;                                    // NEW
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
          .value(function(d) { return d.total_amount; })
          .sort(null);

        var tooltip = d3.select('#chart')                               // NEW
          .append('div')                                                // NEW
          .attr('class', 'tooltip');                                    // NEW
                      
        tooltip.append('div')                                           // NEW
          .attr('class', 'name');                                      // NEW
             
        tooltip.append('div')                                           // NEW
          .attr('class', 'total_amount');                                      // NEW
        tooltip.append('div')                                           // NEW
          .attr('class', 'percent'); 
                                             // NEW
        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.name);
          });

          path.on('mouseover', function(d) {                            // NEW
            var total = d3.sum(dataset.map(function(d) {                // NEW
              return d.total_amount;                                           // NEW
            }));                                                        // NEW
            var percent = Math.round(1000 * d.data.total_amount / total) / 10; // NEW
            tooltip.select('.name').html(d.data.name);                // NEW
            tooltip.select('.total_amount').html(d.data.total_amount);                // NEW
            tooltip.select('.percent').html(percent + '%');             // NEW
            tooltip.style('display', 'block');                          // NEW
          });                                                           // NEW
          
          path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });                                                           // NEW

          path.on('mousemove', function(d) {                            // NEW
            tooltip.style('top', (d3.event.pageY + -130) + 'px')          // NEW
              .style('left', (d3.event.pageX + 15) + 'px');             // NEW
          }); 

        var legend = svg.selectAll('.legend')                     // NEW
          .data(color.domain())                                   // NEW
          .enter()                                                // NEW
          .append('g')                                            // NEW
          .attr('class', 'legend')                                // NEW
          .attr('transform', function(d, i) {                     // NEW
            var height = legendRectSize + legendSpacing;          // NEW
            var offset =  height * color.domain().length / 2;     // NEW
            var horz = 12 * legendRectSize;                        // NEW
            var vert = i * height - offset;                       // NEW
            return 'translate(' + horz + ',' + vert + ')';        // NEW
          }); 
                                                              // NEW
        legend.append('rect')                                     // NEW
          .attr('width', legendRectSize)                          // NEW
          .attr('height', legendRectSize)                         // NEW
          .style('fill', color)                                   // NEW
          .style('stroke', color);                                // NEW
          
        legend.append('text')                                     // NEW
          .attr('x', legendRectSize + legendSpacing)              // NEW
          .attr('y', legendRectSize - legendSpacing)              // NEW
          .text(function(d) { return d; });                       // NEW
      })(window.d3);
    });
  });


});
