Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, Rails.application.config.twitter_key, Rails.application.config.twitter_secret
end
