class User < ActiveRecord::Base
  def self.from_omniauth(auth)
    auth_hash = auth.slice(:provider, :uid).to_hash

    where(auth_hash).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_secret = auth.credentials.secret
      user.save!
    end
  end

  def tweet(tweet)
    client = ::Twitter::REST::Client.new do |config|
      config.consumer_key        = TWITTER_KEY
      config.consumer_secret     = TWITTER_SECRET
      config.access_token        = oauth_token
      config.access_token_secret = oauth_secret
    end
    
    client.update(tweet)
  end
end
