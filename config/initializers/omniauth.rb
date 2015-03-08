Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, 'TWITTER_API_KEY', 'TWITTER_API_SECRET'
end
