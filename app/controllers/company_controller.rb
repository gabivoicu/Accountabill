class CompanyController < ApplicationController
  def details
    @company = Company.find_by_entity_id(params[:entity_id])
    render :json => @company
  end
end
