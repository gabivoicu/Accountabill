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

  $("#front-page-header").on("click", function(event){

  });
});
