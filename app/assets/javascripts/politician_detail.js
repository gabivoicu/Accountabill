function renderPoliticianDetails(data){
  var allDetailsView = new AllDetailsView({model: data});
  allDetailsView.render();
  $("#results-view").html(allDetailsView.el);
  Transition.searchToDetail();
}

//-------------------------- Ajax Calls ---------------------------//

function renderPolitician(bio_id) {
  var request = $.ajax({
      url: '/politician/' + bio_id
  });
  var sector_request = $.ajax({
    url: '/sectors/' + bio_id,
    type: 'get',
    dataType: 'json',
  });
  var contributor_request = $.ajax({
    url: '/contributions/' + bio_id,
    type: 'get',
    dataType: 'json',
  });
  var industry_request = $.ajax({
    url: '/industries/' + bio_id,
    type: 'get',
    dataType: 'json',
  });

  var bills_request = $.ajax({
    url: '/bills/' + bio_id,
    type: 'get',
    dataType: 'json'
  })


//-------------------------- Render Detail View for Politician ---------------------------//

  request.done(renderPoliticianDetails)
  request.done(function(response) { renderContributorTypes(bio_id, response) });
  sector_request.done(renderSectorDonut);
  bills_request.done(renderBills);
  contributor_request.done(renderContributorBarGraph);
  industry_request.done(renderIndustryDonut);
}
