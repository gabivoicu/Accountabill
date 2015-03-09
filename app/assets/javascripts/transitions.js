var Transition = ({
  searchToDetail: function(){
    $(".search-results").hide();
    $("#front-page-header").css("margin-top", "1%");
    $(document).foundation('accordion', 'reflow');
  },
  resetToDefault: function(){
    $('.detail').hide();
    $(".search-results").hide();
    $("#front-page-header").css("margin-top", "10%");
  },
  defaultToDisplaySearchResults: function(){
    $('.detail').hide();
  }
})
