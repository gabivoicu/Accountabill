var BillView = Backbone.View.extend({
  template: JST["templates/politician_search_result"],
  className:"row bill",

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});
