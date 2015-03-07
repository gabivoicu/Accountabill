var PoliticiansCollection = Backbone.Collection.extend({
  initialize: function(options){
    this.url = '/politicians/' + options.zipcode;
  },
  model: Politician
})
