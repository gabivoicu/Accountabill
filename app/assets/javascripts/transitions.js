var Transition = ({
  searchToDetail: function(){
    $("#search-container").hide();
    $("#results-view").show();
    $("#front-page-header").css("margin", "1%");
    $(document).foundation('tab', 'reflow');
    $(document).foundation();
  },
  resetToDefault: function(){
    $("#search-container").hide();
    $("#results-view").hide();
    $("#front-page-header").css("margin-top", "5%");
  },
  defaultToDisplaySearchResults: function(){
    $('#results-view').hide();
    $("#search-container").show();
    $("#front-page-header").css("margin", "1%");
  }
})
