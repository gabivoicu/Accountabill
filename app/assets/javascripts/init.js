$(document).ready(function(){

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    if($("#zip-search-form input").val().length === 5) {
        var zipcode = $("#zip-search-form input").val();
        console.log(zipcode);
        var politicians = new PoliticiansCollection({ zipcode: zipcode });

        var searchResultView = new PoliticianSearchResultsView({collection: politicians});

        searchResultView.render()
        $("#search-container").html(searchResultView.el);
        politicians.fetch({reset: true});
    }

  });

  $(".politician").on("click", function(event){
    event.preventDefault();
    
    var bio_id = "A000014";
    //Steps:
    //Pull biocode out of results from zipcode search and replace the above line
    var contributions = new ContributionsCollection({biocode: bio_id});
    console.log(contributions);

    var contributionView = new AllContributionsView({ collection: contributions });
    
    contributionView.render();
    contributions.fetch({ reset: true });
  });
});
