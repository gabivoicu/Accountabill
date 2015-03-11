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
end
