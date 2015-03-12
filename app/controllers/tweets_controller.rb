class TweetsController < ApplicationController
  def new
  end

  def create
    redirect_to "/auth/twitter" unless current_user
    service = TweetService.new(current_user)
    service.tweet(twitter_params[:message])
  end

  def twitter_params
    params.require(:tweet).permit(:message)
  end
end
