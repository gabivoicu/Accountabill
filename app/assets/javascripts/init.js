

$(document).ready(function(){
  $("#front-page-header").on("click", function(){
    Transition.resetToDefault();
  });

  var politician_results;

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    var searchVal = $("#zip-search-form input").val().charAt(0)

    if (isNaN(searchVal)) {
  
      var name = $("#zip-search-form input").val();

      var politicians = new PoliticiansCollection({ name: name, entryType: "String" });


      politician_results = politicians;

      var searchResultView = new PoliticianSearchResultsView({collection: politicians});

      searchResultView.render();
      $("#search-container").html(searchResultView.el);
      politicians.fetch({reset: true});
      Transition.defaultToDisplaySearchResults();
    }
    else{
      var zipcode = $("#zip-search-form input").val();

      var politicians = new PoliticiansCollection({ zipcode: zipcode, entryType: "Integer" });

      politician_results = politicians;

      var searchResultView = new PoliticianSearchResultsView({collection: politicians});

      searchResultView.render();
      $("#search-container").html(searchResultView.el);
      politicians.fetch({reset: true});
      Transition.defaultToDisplaySearchResults();
    }
  });

  $("#search-container").on("click", ".politician-result", function(event){
    event.preventDefault();
    //Steps:
    //Pull biocode out of results from zipcode search and replace the above line
    var bio_id = $(this).children("span").text();
    renderPolitician(bio_id)
  });
});
