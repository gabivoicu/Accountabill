var AllDetailsView = Backbone.View.extend({
  template: JST['templates/politician_detail'],
  className: "detail",

  render: function(){
  	console.log(this.model);
    this.$el.html(this.template(this.model.hash_data));
    return this;
  }

});
