class NetworkController < ApplicationController
  def politicians
    response = HTTParty.get("http://congress.api.sunlightfoundation.com/legislators/locate?zip=#{params[:zipcode]}&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    render :json => response
  end

  def contributions
    politician = Politician.find_by_bio_id(params[:bio_id])

    response = HTTParty.get("http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors.json?cycle=2012&limit=50&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    render :json => response
  end
end
