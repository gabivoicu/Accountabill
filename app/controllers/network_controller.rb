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

    response = HTTParty.get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors.json?cycle=2012&limit=50&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    contribution_array = []

    response.parsed_response.each do |c_info|
      contribution_array << {total_amount: c_info["total_amount"], name: c_info["name"]}
    end

    p contribution_array

    render :json => contribution_array
  end
end
