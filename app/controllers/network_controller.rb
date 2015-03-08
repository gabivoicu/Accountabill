class NetworkController < ApplicationController
  def politicians
    response = HTTParty.get("http://congress.api.sunlightfoundation.com/legislators/locate?zip=#{params[:zipcode]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    politician_array = []

    response.fetch("results").each do |p_info|
      politician_array << {first_name: p_info["first_name"], last_name: p_info["last_name"], title: p_info["title"], party: p_info["party"]}
    end

    render :json => politician_array
  end

  def contributions
    politician = Politician.find_by_bio_id(params[:bio_id])

    response = HTTParty.get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors.json?cycle=2014&limit=50&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    contribution_array = []

    response.parsed_response.each do |c_info|
      contribution_array << {total_amount: c_info["total_amount"], name: c_info["name"]}
    end

    render :json => contribution_array
  end

  def sectors
    politician = Politician.find_by_bio_id(params[:bio_id])

    response = HTTParty.get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors/sectors.json?cycle=2014&limit=10&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    sector_array = []

    response.parsed_response.each do |s_info|
      sector_array << {sector: find_sector(s_info["sector"]), count: s_info["count"], amount: s_info["amount"]}
    end

    render :json => sector_array
  end

  
  def bills
    response = HTTParty.get("http://congress.api.sunlightfoundation.com/bills?sponsor_id=#{params[:bio_id]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    bills_array = []

    response.fetch("results").each do |b_info|
      bills_array << {official_title: b_info["official_title"], open_congress: b_info.fetch("urls")["opencongress"]}
    end

    render :json => bills_array
  end

  private

  def find_sector(sector)
    case sector
    when "A"
      sector = "Agribusiness"
    when "B"
      sector = "Communications/Electronics"
    when "C"
      sector = "Construction"
    when "D"
      sector = "Defense"
    when "E"
      sector = "Energy/Natural Resources"
    when "F"
      sector = "Finance/Insurance/Real Estate"
    when "H"
      sector = "Health"
    when "K"
      sector = "Lawyers and Lobbyists"
    when "M"
      sector = "Transportation"
    when "N"
      sector = "Misc. Business"
    when "Q"
      sector = "Ideology/Single Issue"
    when "P"
      sector = "Labor"
    when "W"
      sector = "Other"
    when "Y"
      sector = "Unknown"
    when "Z"
      sector = "Administrative Use"
    end
  end
end
