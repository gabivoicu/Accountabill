var ContributionsCollection = Backbone.Collection.extend({
  initialize: function(options){
    this.url = options.url;
  },
  model: Contribution
})
