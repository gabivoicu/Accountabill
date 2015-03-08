var AllDetailsView = Backbone.View.extend({
  template: JST['/templates/details'],
  className: "detail",

  render: function(){
    this.$el.html(this.template);
    return this;
  }
});
