var ContributionView = Backbone.View.extend({
  template: JST["templates/contribution"],
  tagName: "li",
  className:"contribution",

  render: function(){
    this.$el.html(this.template(this.model.attributes.url));
  }
});
