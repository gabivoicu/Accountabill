var PoliticiansCollection = Backbone.Collection.extend({
  initialize: function(options){
    if (options.entryType == "Integer") {
      this.url = '/politicians/' + options.zipcode;
    } else {
      this.url = '/politicians/find/' + options.name;
    }
  },
  model: Politician
})
