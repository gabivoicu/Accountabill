var AllDetailsView = Backbone.View.extend({
  template: JST['templates/politician_detail'],
  className: "detail",

  initialize: function(info){
    var data = info.data.hash_data;
    console.log(data)
    this.firstname = data.firstname;
  },

  render: function(){
    this.$el.html(this.template);
    return this;
  }

});
