function renderResults(searchVal) {

  var politicians;
  if (isNaN(searchVal)) {
    politicians = new PoliticiansCollection({ name: searchVal, entryType: "String" });
  } else{
    politicians = new PoliticiansCollection({ zipcode: searchVal, entryType: "Integer" });
  }

  var searchResultView = new PoliticianSearchResultsView({collection: politicians});
  searchResultView.render();
  
  $("#search-container").html(searchResultView.el);
  politicians.fetch({reset: true});
  Transition.defaultToDisplaySearchResults();
}
