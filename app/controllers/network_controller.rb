class NetworkController < ApplicationController

  def contributions
    # params[:bio_id] = "W000779"
    politician = Politician.find_by_bio_id("W000779")
    url = "http://transparencydata.com/api/1.0/aggregates/pol/#{politician.entity_id}/contributors.json?cycle=2012&limit=10&apikey=#{ENV['SUNLIGHT_API_KEY']}"
    
    p url

    @contributions = HTTParty.get(url)
  end
end
