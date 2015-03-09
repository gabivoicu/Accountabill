var BillsCollection = Backbone.Collection.extend({
  initialize: function(options){
    this.url = '/bills/' + options.biocode;
  },
  model: Bill
})
