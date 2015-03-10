require 'rails_helper'

describe NetworkController do
  let (:politician) { Politician.create(bio_id: "D000607", entity_id: "4d86ffd297c84c059577c0afe4f8d0ee") }

  context "Finding a Politician by Zip Code" do
    it "should return a JSON object" do
      
    end
  end

  context "Finding a Politician by Name" do
    it "should return a JSON object" do
    end
  end

  context "Finding Contributions to a Politician" do
    it "should return a JSON object" do
    end
  end

  context "Finding Contributions by Sector" do
    it "should return a JSON object" do
    end
  end

  context "Finding Contribuions by Industry" do
    it "should return a JSON object" do
    end
  end

  context "Finding Sponsored Bills" do
    it "should return a JSON object" do
    end
  end

  context "Finding Types of Contributors" do
    it "should return a JSON object" do
    end
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
