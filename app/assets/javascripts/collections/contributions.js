var ContributionsCollection = Backbone.Collection.extend({
  initialize: function(options){
    this.url = '/contributions/' + options.biocode;
  },
  model: Contribution
})
