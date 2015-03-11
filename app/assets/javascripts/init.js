$(document).ready(function(){
  var router = new AppRouter();

  $("#front-page-header").on("click", function(){
    Transition.resetToDefault();
  });

  var politician_results;

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    var searchVal = $("#zip-search-form input").val();

    renderResults(searchVal)
  });

  $("#search-container").on("click", ".politician-result", function(event){
    event.preventDefault();

    var bio_id = $(this).children("span").text();

    renderPolitician(bio_id)
  });
});
