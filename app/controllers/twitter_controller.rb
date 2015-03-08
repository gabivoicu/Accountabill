class TwitterController < ApplicationController
  def login
    @provider = "twitter"
  end

  def auth
    p auth_hash = request.env['omniauth.auth']
  end

  # def create
  #   auth_hash = request.env['omniauth.auth']
  #   p auth_hash.credentials # Contains the token and secret
  #   user = current_user
  #   if current_user
  #     # Means our user is signed in. Add the authorization to the user
  #     req = user.oauth_request(auth_hash)
  #     render :data_retrieval, locals: {provider: Provider.find_by(name: auth_hash[:provider]), req: req}
  #     # render :text => "#{current_user.first_name} can now login using #{auth_hash["provider"].capitalize} too!"
  #   else
  #     # Log him in or sign him up
  #     auth = Authorization.find_or_create(auth_hash)

  #     # Create the session
  #     current_user = auth.user.id

  #     render :text => "Welcome #{auth.user.first_name auth.user.last_name}!"
  #   end
  # end

  private 

  def oauth_request(auth_hash)

  end
end


#"Nate's Method"
  
# def self.oauth_request
#   secret = "ebHgCUXVBmfmtqpQ"                                   # The user secret from the Credentials
#   token = "t6480427084414976"                                   # The user token from the Credentials
#   oauth_token = OAuth::Token.new(token, secret)
#   #                               Our Site Key        Our Site Secret           Our Site Stub
#   consumer = OAuth::Consumer.new("UHze9rM6n5NtNee2", "f9Z24DkmGTyWZx5E", site: "http://www.khanacademy.org/api/v1")
#   uri = URI("http://www.khanacademy.org/api/v1/user/playlists") # This is the url that we want to pull data from


#   req = Net::HTTP::Get.new(uri)                                 # This is the GET request

#   response = Net::HTTP.start(uri.hostname, uri.port) do |http|  # This is processing the request
#     req.oauth!(http, consumer, oauth_token)                     # .oauth! call which formats the request
#     http.request(req)                                           # The actual http request is made here
#   end
#   puts response.body                                            # <Net::HTTPOK:0x007f88b30485b0> body content
# end
