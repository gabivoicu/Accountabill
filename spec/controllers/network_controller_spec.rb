require 'rails_helper'

describe NetworkController do

  before(:each) do
    kirk   = create(:mark_kirk)
    davis  = create(:danny_davis)
    durbin = create(:dick_durbin)
  end

  context "Finding a Politician by Zip Code" do
    let(:zipcode) { 60302 }
    it "should have no fewer than three results" do
      VCR.use_cassette("politicians") do
        response = get :politicians, zipcode: zipcode
      end
      expect(JSON.parse(response.body).length).to be >= (3)
    end

    it "should return data" do
      VCR.use_cassette("politicians") do
        response = get :politicians, zipcode: zipcode
      end
      body = JSON.parse(response.body)
      politician = body.first
      expect(politician["firstname"]).to eq("Mark")
      expect(politician["lastname"]).to eq("Kirk")
    end
  end

  context "Finding a Politician by Name" do
    let(:name) { "Kirk" }

    it "should return data" do
      VCR.use_cassette("politician_names") do
        response = get :politician_names, name: name
      end
      body = JSON.parse(response.body)
      politician = body.first
      expect(politician["firstname"]).to eq("Mark")
      expect(politician["lastname"]).to eq("Kirk")
    end
  end

  context "Finding Contributions to a Politician" do
    let(:bio_id) { "K000360" }

    it "should convert the total amount donated to an integer" do
      VCR.use_cassette("contributions") do
        response = get :contributions, bio_id: bio_id
      end
      contributions = JSON.parse(response.body)
      expect(contributions[0]['total_amount']).to be_kind_of(Integer)
    end

    it "should return data" do
      VCR.use_cassette("contributions") do
        response = get :contributions, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      contribution = body.first
      expect(contribution["total_amount"]).to eq(52000)
      expect(contribution["name"]).to eq("Highfields Capital Management")
    end
  end

  context "Finding Contributions by Sector" do

    let(:bio_id) { "K000360" }

    it "should translate the sector codes to real sectors" do
      VCR.use_cassette("sectors") do
        response = get :sectors, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      sector = body.first
      expect(sector["sector"]).to eq("Finance/Insurance/Real Estate")
    end

    it "should convert count and amount to integers" do
      VCR.use_cassette("sectors") do
        response = get :sectors, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      sector = body.first
      expect(sector["count"]).to be_kind_of(Integer)
      expect(sector["amount"]).to be_kind_of(Integer)       
    end

    it "should return data" do
      VCR.use_cassette("sectors") do
        response = get :sectors, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      sector = body.first
      expect(sector["sector"]).to eq("Finance/Insurance/Real Estate")
      expect(sector["count"]).to eq(373)
      expect(sector["amount"]).to eq(606950)
    end
  end

  context "Finding Contribuions by Industry" do

    let(:bio_id) { "K000360" }

    it "should convert count and amount to integers" do
      VCR.use_cassette("industries") do
        response = get :industries, bio_id: bio_id
      end  
      body = JSON.parse(response.body)
      industry = body.first 
      expect(industry["count"]).to be_kind_of(Integer)
      expect(industry["amount"]).to be_kind_of(Integer)  
    end

    it "should return data" do
      VCR.use_cassette("industries") do
        response = get :industries, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      industry = body.first
      expect(industry["name"]).to eq("Securities & Investment")
      expect(industry["count"]).to eq(170)
      expect(industry["amount"]).to eq(337600)
    end
  end

  context "Finding Sponsored Bills" do

    let(:bio_id) { "K000360" }

    it "should return data" do
      VCR.use_cassette("bills") do
        response = get :bills, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      bills = body.first
      expect(bills["bill_id"]).to eq("s628-114")
      expect(bills["official_title"]).to eq("A bill to amend the Public Health Service Act to provide for the designation of maternity care health professional shortage areas.")
      expect(bills["open_congress"]).to eq("https://www.opencongress.org/bill/s628-114")
    end
  end

  context "Finding Types of Contributors" do

    let(:bio_id) { "K000360" }

    it "should convert total amount and count to integers" do
      VCR.use_cassette("contributor_types") do
        response = get :contributor_types, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      p body
      type = body.first

      expect(type["count"]).to be_kind_of(Integer)
      expect(type["total_amount"]).to be_kind_of(Integer)
    end

    it "should return data" do
      VCR.use_cassette("contributor_types") do
        response = get :contributor_types, bio_id: bio_id
      end
      body = JSON.parse(response.body)
      expect(body[0]["title"]).to eq("Individuals")
      expect(body[0]["count"]).to eq(476)
      expect(body[0]["total_amount"]).to eq(481028)
      expect(body[1]["title"]).to eq("PACs")
      expect(body[1]["count"]).to eq(198)
      expect(body[1]["total_amount"]).to eq(240719)
    end
  end
end



