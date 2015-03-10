require 'rails_helper'

describe NetworkController do
  context "Finding a Politician by Zip Code" do
  end

  context "Finding a Politician by Name" do
  end

  context "Finding Contributions to a Politician" do
  end

  context "Finding Contributions by Sector" do
  end

  context "Finding Contribuions by Industry" do
  end

  context "Finding Sponsored Bills" do
  end

  context "Finding Types of Contributors" do
  end
end


# it "converts total amount donated to an integer" do
#   VCR.use_cassette("contributions") do
#     bio_id = "D000607"
#     politician = Politician.create!(bio_id: bio_id, entity_id: "4d86ffd297c84c059577c0afe4f8d0ee")

#     response = get :contributions, bio_id: bio_id
#     contributions = JSON.parse(response.body)

#     expect(contributions[0]['total_amount']).to be_kind_of(Integer)
#   end
# end
