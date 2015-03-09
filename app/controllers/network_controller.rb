class NetworkController < ApplicationController
  def politicians
    response = HTTParty.get("http://congress.api.sunlightfoundation.com/legislators/locate?zip=#{params[:zipcode]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")
    politician_array = []

    response.fetch("results").each do |p_info|
      politician_array << Politician.find_by_bio_id(p_info["bioguide_id"]).hash_data
    end

    render :json => politician_array
  end

  def politician_names
    name = split_into_names(params[:name])

    

    politician_array = []

    response.fetch("results").each do |p_info|
      politician_array << {first_name: p_info["first_name"], last_name: p_info["last_name"], title: p_info["title"], party: p_info["party"], bioguide_id: p_info["bioguide_id"], birthday: p_info["birthday"], chamber: p_info["chamber"], contact_form: p_info["contact_form"], district: p_info["district"], oc_email: p_info["oc_email"], phone: p_info["phone"], state: p_info["state"], state_name: p_info["state_name"], term_end: p_info["term_end"], term_start: p_info["term_start"], twitter_id: p_info["twitter_id"], website: p_info["website"], photo_url: p_info["photo_url"]}
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

  def industries
    politician = Politician.find_by_bio_id(params[:bio_id])

    response = HTTParty.get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors/industries.json?cycle=2014&limit=10&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    industries_array = []

    response.parsed_response.each do |ind_info|
      industries_array << {name: capitalize_all_words!(ind_info["name"]), count: ind_info["count"], amount: ind_info["amount"]}
    end

    render :json => industries_array
  end


  def bills
    response = HTTParty.get("http://congress.api.sunlightfoundation.com/bills?sponsor_id=#{params[:bio_id]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    bills_array = []

    response.fetch("results").each do |b_info|
      bills_array << {official_title: b_info["official_title"], open_congress: b_info.fetch("urls")["opencongress"]}
    end

    render :json => bills_array
  end

  def contributor_types
    politician = Politician.find_by_bio_id(params[:bio_id])

    response = HTTParty.get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors/type_breakdown.json?cycle=2012&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    contributor_type_array = []
    contributor_type_array.push(individuals: {count: response.parsed_response.fetch("Individuals").at(0), total_amount: response.parsed_response.fetch("Individuals").at(1)})
    contributor_type_array.push(pacs: {count: response.parsed_response.fetch("PACs").at(0), total_amount: response.parsed_response.fetch("PACs").at(1)})

    render :json => contributor_type_array
  end

  private

  def capitalize_all_words!(string)
    array = string.split(" ")
    new_array = array.map { |word| word.capitalize }
    new_string = new_array.join(" ")
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
  end
end
