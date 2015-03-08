var AllDetailsView = Backbone.View.extend({
  template: JST['templates/politician_detail'],
  className: "detail",

  render: function(){
    this.$el.html(this.template);
    return this;
  }

});
