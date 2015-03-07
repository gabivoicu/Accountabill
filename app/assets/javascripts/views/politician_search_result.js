var PoliticianSearchResult = Backbone.View.extend({
  template: JST['templates/politician_search_result'],
  initialize: function(){},
  render: function(){
    this.$el.html(this.template);
    return this;
  },
  addOne: function() {},
  addAll: function() {}
})