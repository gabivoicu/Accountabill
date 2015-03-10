TWITTER_KEY = ENV["TWITTER_API_KEY"]
TWITTER_SECRET = ENV["TWITTER_SECRET_KEY"]

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, TWITTER_KEY, TWITTER_SECRET
end
