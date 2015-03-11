require 'spec_helper'
require 'twitter'
require_relative '../../app/models/tweet_service'

TWITTER_KEY = "stub key"
TWITTER_SECRET = "stub secret"

describe TweetService do
  describe "tweet" do
    it "posts a tweet using the Twitter client" do
      message = "tweet tweet"
      client = double(:twitter_client) 
      service = TweetService.new(double(:user))
     
      allow(service).to receive(:client).and_return client

      expect(client).to receive(:update).with(message)
      service.tweet(message)
    end
  end

  describe "client" do
    let(:user) {double(:user, oauth_token: "token", oauth_secret: "secret")}
    let(:service) {TweetService.new(user)}

    it "initializes a client with the user's token" do
      expect(service.client.access_token).to eq("token")
    end

    it "initializes a client with the user's secret" do
      expect(service.client.access_token_secret).to eq("secret")
    end

  end
end
