$(document).ready(function(){


  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    var zipcode = $("#zip-search-form input").val();
    console.log(zipcode);

    var url = "congress.api.sunlightfoundation.com/legislators/locate?zip=" + zipcode + "&apikey=" + API_KEY

    var politicians = new PoliticianCollection({ url: url })
    var searchResultView = new PoliticianSearchResult;
    searchResultView.render();
    politicians.fetch({reset: true})


  });




});