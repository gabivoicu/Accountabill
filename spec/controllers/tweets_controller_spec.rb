require 'rails_helper'

RSpec.describe TweetsController, type: :controller do

  describe "GET #new" do
    xit "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #create" do
    xit "returns http success" do
      get :create, {tweet: {message: "hi mom"}}
      expect(response).to have_http_status(:success)
    end
  end

end
