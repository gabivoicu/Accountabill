class NetworkController < ApplicationController
  def politicians
    politician_array = []
    response = get("http://congress.api.sunlightfoundation.com/legislators/locate?zip=#{params[:zipcode]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    response.fetch("results").each do |p_info|
      politician_array << find(p_info["bioguide_id"]).hash_data
    end
    render :json => politician_array
  end

  def politician_names
    politician_array = []
    name = split_into_names(params[:name])
    response = get("http://congress.api.sunlightfoundation.com/legislators?first_name=#{name[0]}&last_name=#{name[1]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    response.parsed_response.fetch("results").each do |p_info|
      politician_array << find(p_info["bioguide_id"]).hash_data
    end
    response = get("http://congress.api.sunlightfoundation.com/legislators?first_name=#{name[1]}&last_name=#{name[0]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    response.parsed_response.fetch("results").each do |p_info|
      politician_array << find(p_info["bioguide_id"]).hash_data
    end
    render :json => politician_array
  end

  def contributions
    contribution_array = []
    politician = find(params[:bio_id])
    response = get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors.json?cycle=2014&limit=50&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    response.parsed_response.each do |c_info|
      contribution_array << {total_amount: c_info["total_amount"].to_i, name: c_info["name"]}
    end
    render :json => contribution_array
  end

  def sectors
    sector_array = []
    politician = find(params[:bio_id])
    response = get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors/sectors.json?cycle=2014&limit=10&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    response.parsed_response.each do |s_info|
      sector_array << {sector: find_sector(s_info["sector"]), count: s_info["count"].to_i, amount: s_info["amount"].to_i}
    end
    render :json => sector_array
  end

  def industries
    industries_array = []
    politician = find(params[:bio_id])
    response = get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors/industries.json?cycle=2014&limit=10&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    response.parsed_response.each do |ind_info|
      industries_array << {name: ind_info["name"].titleize, count: (ind_info["count"]).to_i, amount: (ind_info["amount"]).to_i}
    end
    render :json => industries_array
  end


  def bills
    bills_array = []
    response = get("http://congress.api.sunlightfoundation.com/bills?sponsor_id=#{params[:bio_id]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    response.fetch("results").each do |b_info|
      bills_array << {bill_id: b_info["bill_id"], official_title: b_info["official_title"], open_congress: b_info.fetch("urls")["opencongress"]}
    end
    render :json => bills_array
  end

  def contributor_types
    contributor_type_array = []
    politician = find(params[:bio_id])
    response = get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors/type_breakdown.json?cycle=2012&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    contributor_type_array.push(title: "Individuals", count: response.parsed_response.fetch("Individuals").at(0), total_amount: response.parsed_response.fetch("Individuals").at(1))
    contributor_type_array.push(title: "PACs", count: response.parsed_response.fetch("PACs").at(0), total_amount: response.parsed_response.fetch("PACs").at(1))
    render :json => contributor_type_array
  end

  private

  def get(url)
    HTTParty.get(url)
  end

  def find(bio_id)
    Politician.find_by_bio_id(bio_id)
  end

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

  def split_into_names(name)
    names = name.split
    capitalize_names(names)
  end

  def capitalize_names(names)
    names.each do |name|
      name.capitalize!
    end
    names
  end
end
