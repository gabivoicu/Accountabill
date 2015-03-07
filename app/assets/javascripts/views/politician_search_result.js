var PoliticianSearchResultView = Backbone.View.extend({
  template: JST["templates/politician_search_result"],
  tagName: "li",
  className:"politician",

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});