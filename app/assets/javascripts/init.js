$(document).ready(function(){
API_KEY = "2a92fee9d78f4fddbe5d9e14f3632465"

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    var zipcode = $("#zip-search-form input").val();
    console.log(zipcode);

    var new_url = "http://congress.api.sunlightfoundation.com/legislators/locate?zip=" + zipcode + "&apikey=" + API_KEY;

    var politicians = new PoliticiansCollection({ url: new_url });
    console.log("yay!")
    var searchResultView = new PoliticianSearchResultsView({collection: politicians});
    searchResultView.render();
    politicians.fetch({reset: true});

  });

});