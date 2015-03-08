class PoliticianController < ApplicationController
  def details
    @politician = Politician.find_by_bio_id(params[:bio_id])
    render :json => @politician
  end
end
