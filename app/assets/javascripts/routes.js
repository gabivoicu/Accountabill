var AppRouter = Backbone.Router.extend({
  initialize: function(){
      Backbone.history.start({ pushState:true, root:"/" });
  },
  routes: {
    "bio/:bioId": "bio",
    "query/:input": "query"
  },
  bio: function(bioId) {
    renderPolitician(bioId)
  },
  query: function(input) {
    renderResults(input)
  }
});
var router = new AppRouter();
