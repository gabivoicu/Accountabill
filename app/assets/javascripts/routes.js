var AppRouter = Backbone.Router.extend({
  initialize: function(){
      Backbone.history.start({ pushState:true, root:"/" });
  },
  routes: {
    "bio/:bioId": "bio"
  },
  bio: function(bioId) {
    console.log("Bio:", bioId);
    renderPolitician(bioId)
  }
});
var router = new AppRouter();