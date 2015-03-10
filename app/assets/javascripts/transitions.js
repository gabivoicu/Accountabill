var Transition = ({
  searchToDetail: function(){
    $("#search-container").hide();
    $("#results-view").show();
    $("#front-page-header").css("margin-top", "1%");
    $(document).foundation('tab', 'reflow');
  },
  resetToDefault: function(){
    $('.detail').hide();
    $(".search-results").hide();
    $("#results-view").hide();
    $("#front-page-header").css("margin-top", "10%");
  },
  defaultToDisplaySearchResults: function(){
    $('.detail').hide();
    $("#search-container").show();
    $("#front-page-header").css("margin-top", "1%");
  }
})
