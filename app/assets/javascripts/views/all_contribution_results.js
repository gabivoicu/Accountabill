var AllContributionsView = Backbone.View.extend({
  template: JST['templates/all_contribution_results'],
  initialize: function(){},
  render: function(){
    this.$el.html(this.template);
    return this;
  },  

  addOne: function(contribution) {
    var view = new ContributionView({model: contribution});
    view.render();

    this.$el.find("SOMETHING ELSE").append(view.el);

    return this;
  },

  addAll: function() {
    this.collection.each(function(contribution){
      this.addOne(contribution);
    }, this);

    return this;
  }
})
