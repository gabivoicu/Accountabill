require 'rails_helper'


describe NetworkController do
  it "converts total amount donated to an integer" do
    VCR.use_cassette("contributions") do
      bio_id = "D000607"
      politician = Politician.create!(bio_id: bio_id, entity_id: "4d86ffd297c84c059577c0afe4f8d0ee")

      response = get :contributions, bio_id: bio_id
      contributions = JSON.parse(response.body)

      expect(contributions[0]['total_amount']).to be_kind_of(Integer)
    end
  end

end