var ContributionsCollection = Backbone.Collection.extend({
  initialize: function(options){
    console.log(options)
    this.url = '/contributions/' + options.biocode;
  },
  model: Contribution
})
