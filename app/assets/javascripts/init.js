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

        searchResultView.render()
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
  });

  $( document ).ready(function() {
    var margin = {top: 5, right: 15, bottom: 20, left: 200},
        width = 700 - margin.left - margin.right,
        height = 50 - margin.top - margin.bottom;

    var chart = d3.bullet()
        .width(width)
        .height(height);

    d3.json("bullets.json", function(error, data) {
      var svg = d3.select("#contributor-types").selectAll("svg")
          .data(data)
        .enter().append("svg")
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
    });
  });

});
