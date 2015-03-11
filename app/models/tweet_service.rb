class TweetService
  def initialize(user)
    @user = user
  end

  def tweet(tweet)
    client.update(tweet)
  end

  def client
    @_client ||= ::Twitter::REST::Client.new do |config|
      config.consumer_key        = TWITTER_KEY
      config.consumer_secret     = TWITTER_SECRET
      config.access_token        = @user.oauth_token
      config.access_token_secret = @user.oauth_secret
    end
  end
end
