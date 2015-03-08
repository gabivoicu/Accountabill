var PoliticianSearchResultView = Backbone.View.extend({
  template: JST["templates/politician_search_result"],
  className:"row politician-result",

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});
