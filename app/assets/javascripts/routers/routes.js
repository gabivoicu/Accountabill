var AppRouter = Backbone.Router.extend({
  initialize: function(){
      Backbone.history.start({ pushState:true, root:"/" });
  },
  routes: {
    "/": "root",
    "bio/:bioId": "bio",
    "query/:input": "query"
  },
  
  root: function() {
    Transition.resetToDefault();
  },

  bio: function(bioId) {
    renderPolitician(bioId);
  },
  query: function(input) {
    renderResults(input);
  }
});

