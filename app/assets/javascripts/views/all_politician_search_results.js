var PoliticianSearchResultsView = Backbone.View.extend({
  template: JST['templates/politician_search_result'],
  initialize: function(){
    this.listenTo(this.collection, "reset", this.addAll);
  },
  render: function(){
    this.$el.html(this.template);
    return this;
  },  

  addOne: function(politician) {
    var view = new PoliticianSearchResultView({model: politician});
    view.render();

    this.$el.find(".search-results").append(view.el);

    return this;
  },

  addAll: function() {
    this.collection.each(function(politician){
      this.addOne(politician);
    }, this);

    return this;
  }
})