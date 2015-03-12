$(document).ready(function(){
  var router = new AppRouter();

  $("#front-page-header").on("click", function(event){
    event.preventDefault();
    router.navigate("/", {trigger: true});    
  });

  var politician_results;

  $("#zip-search-form").on("submit", function(event){
    event.preventDefault();

    var searchVal = $("#zip-search-form input").val();

    router.navigate("query/" + searchVal, {trigger: true});
  });

  $("#search-container").on("click", ".politician-result", function(event){
    event.preventDefault();

    var bio_id = $(this).children("span").text();

    router.navigate("bio/" + bio_id, {trigger: true});
  });
});
