function renderResults(searchVal) {

  if (isNaN(searchVal)) {

    var politicians = new PoliticiansCollection({ name: searchVal, entryType: "String" });

    var searchResultView = new PoliticianSearchResultsView({collection: politicians});

    searchResultView.render();
    $("#search-container").html(searchResultView.el);
    politicians.fetch({reset: true});
    Transition.defaultToDisplaySearchResults();
  }

  else{

    var politicians = new PoliticiansCollection({ zipcode: searchVal, entryType: "Integer" });

    var searchResultView = new PoliticianSearchResultsView({collection: politicians});

    searchResultView.render();

    $("#search-container").html(searchResultView.el);
    politicians.fetch({reset: true});
    Transition.defaultToDisplaySearchResults();
  }

}
