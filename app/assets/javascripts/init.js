$(document).ready(function(){
API_KEY = "2a92fee9d78f4fddbe5d9e14f3632465"

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    var zipcode = $("#zip-search-form input").val();
    console.log(zipcode);

    var new_url = "http://congress.api.sunlightfoundation.com/legislators/locate?zip=" + zipcode + "&apikey=" + API_KEY;

    var politicians = new PoliticiansCollection({ url: new_url });
    var searchResultView = new PoliticianSearchResultsView({collection: politicians});
    searchResultView.render()
    $("#search-container").append(searchResultView.el);
    politicians.fetch({reset: true});


  });

  $(".politician").on("click", function(event){
    event.preventDefault();

    //Steps:
    //Pull biocode out of results from zipcode search
    //Query the database using the biocode, get entity_id
    //Query the API using the entity_id and get the contributions
    //Render the contributions

    var entity_id = "4148b26f6f1c437cb50ea9ca4699417a";
    var new_url = "http://transparencydata.com/api/1.0/aggregates/pol/4148b26f6f1c437cb50ea9ca4699417a/contributors.json?cycle=2012&limit=10&apikey=29e47b0de0384bcfb20ae020227a5426"

    var contributions = new ContributionsCollection({ url: new_url });
    console.log(contributions);

    var contributionView = new AllContributionsView({ collection: contributions });
    
    contributionView.render();
    contributions.fetch({ reset: true });
  });
});
