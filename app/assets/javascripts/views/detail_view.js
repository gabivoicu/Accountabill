var DetailView = Backbone.View.extend({
  template: JST['/templates/details'],
  tagname: "li",

  render: function(){
    this.$el.html(this.template(this.model.attributes.url));
  }
});
