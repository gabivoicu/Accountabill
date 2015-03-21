//-------------------------- Bills ---------------------------//

function renderBills(response) {
  for (var i = 0; i < response.length; i++) {
    $("#bills-listing").append("<span id='bill'><p>Bill Number " + response[i].bill_id + ": <a target='_blank' href='" + response[i].open_congress + "'>" + response[i].official_title + "</a></p></span>")
  }
}
