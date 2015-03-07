var PoliticiansCollection = Backbone.Collection.extend({
  initialize: function(options){
    this.url = options.url;
  },
  model: Politician
})
