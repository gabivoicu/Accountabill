$(document).ready(function(){
// API_KEY = <%= ENV['SUNLIGHT_API_KEY'] %>;

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    var zipcode = $("#zip-search-form input").val();
    console.log(zipcode);

    // var new_url = "http://congress.api.sunlightfoundation.com/legislators/locate?zip=" + zipcode + "&apikey=" + API_KEY;

    var politicians = new PoliticiansCollection({ url: new_url });
    var searchResultView = new PoliticianSearchResultsView({collection: politicians});
    searchResultView.render()
    $("#search-container").append(searchResultView.el);
    politicians.fetch({reset: true});


  });

  $(".politician").on("click", function(event){
    event.preventDefault();
    var bio_id = "A000014";
    //Steps:
    //Pull biocode out of results from zipcode search
    //Query the database using the biocode, get entity_id
    //Query the API using the entity_id and get the contributions
    //Render the contributions
    var contributions = new ContributionsCollection({biocode: bio_id});
    console.log(contributions);

    var contributionView = new AllContributionsView({ collection: contributions });
    
    contributionView.render();
    contributions.fetch({ reset: true });
  });
});
