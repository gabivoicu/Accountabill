var AppRouter = Backbone.Router.extend({
  initialize: function(){
      Backbone.history.start({ pushState:true, root:"/" });
  },
  routes: {
    "bio/:bioId": "bio",
    "query/:input": "query"
  },
  bio: function(bioId) {
    console.log("Bio:", bioId);
    renderPolitician(bioId)
  },
  query: function(input) {
    console.log("In query, yay!");
    renderResults(input)
  }
});
var router = new AppRouter();