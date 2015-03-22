function renderResults(searchVal) {

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
}
