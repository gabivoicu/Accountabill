var Transition = ({
  searchToDetail: function(){
    $("#search-container").hide();
    $(document).foundation('accordion', 'reflow');
  },
  resetToDefault: function(){
    $('.detail').hide();
    $(".search-results").hide();
    $("#front-page-header").css("margin-top", "10%");
  },
  defaultToDisplaySearchResults: function(){
    $('.detail').hide();
    $("#search-container").show();
    $("#front-page-header").css("margin-top", "1%");
  }
})
