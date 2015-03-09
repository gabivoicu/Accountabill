var BillsView = Backbone.View.extend({
  template: JST['templates/all_bills'],
  initialize: function(){
    this.listenTo(this.collection, "reset", this.addAll);
  },

  render: function(){
    this.$el.html(this.template);
    return this;
  },  

  addOne: function(politician) {
    var view = new BillView({model: bill});
    view.render();

    this.$el.find("#Bills-Here").append(view.el);

    return this;
  },

  addAll: function() {
    this.collection.each(function(bill){
      this.addOne(bill);
    }, this);

    return this;
  }
})
