require 'rails_helper'

describe NetworkController do

  before(:each) do
    kirk   = create(:mark_kirk)
    davis  = create(:danny_davis)
    durbin = create(:dick_durbin)
  end

  context "Finding a Politician by Zip Code" do

    it "should return a JSON object" do
      VCR.use_cassette("politicians") do
        zipcode = 60302

        response = get :politicians, zipcode: zipcode
        expect { JSON.parse(response.body) }.to_not raise_error    
      end
    end

    it "should have no fewer than three results" do
      VCR.use_cassette("politicians") do
        zipcode = 60302

        response = get :politicians, zipcode: zipcode
        expect(JSON.parse(response.body).length).to be >= (3)
      end
    end
  end

  context "Finding a Politician by Name" do
    it "should return a JSON object" do
      VCR.use_cassette("politician_names") do
        name = "Kirk"

        response = get :politician_names, name: name
        expect { JSON.parse(response.body) }.to_not raise_error 
      end
    end
  end

  context "Finding Contributions to a Politician" do
    it "should return a JSON object" do
      VCR.use_cassette("contributions") do
        bio_id = "K000360"

        response = get :contributions, bio_id: bio_id
        expect { JSON.parse(response.body) }.to_not raise_error 
      end
    end

    it "should convert the total amount donated to an integer" do
      VCR.use_cassette("contributions") do
        bio_id = "K000360"

        response = get :contributions, bio_id: bio_id
        contributions = JSON.parse(response.body)

        expect(contributions[0]['total_amount']).to be_kind_of(Integer)
      end
    end
  end

  context "Finding Contributions by Sector" do
    it "should return a JSON object" do
      VCR.use_cassette("sectors") do
        bio_id = "K000360"

        response = get :sectors, bio_id: bio_id
        expect { JSON.parse(response.body) }.to_not raise_error 
      end
    end
  end

  context "Finding Contribuions by Industry" do
    it "should return a JSON object" do
      VCR.use_cassette("industries") do
        bio_id = "K000360"

        response = get :industries, bio_id: bio_id
        expect { JSON.parse(response.body) }.to_not raise_error 
      end
    end


  end

  context "Finding Sponsored Bills" do
    it "should return a JSON object" do
      VCR.use_cassette("bills") do
        bio_id = "K000360"

        response = get :bills, bio_id: bio_id
        expect { JSON.parse(response.body) }.to_not raise_error 
      end
    end
  end

  context "Finding Types of Contributors" do
    it "should return a JSON object" do
      VCR.use_cassette("contributor_types") do
        bio_id = "K000360"

        response = get :contributor_types, bio_id: bio_id
        expect { JSON.parse(response.body) }.to_not raise_error 
      end
    end
  end
end



