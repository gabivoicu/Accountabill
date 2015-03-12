class TweetsController < ApplicationController
  def new
  end

  def create
    if current_user
      current_user.tweet(twitter_params[:message])
    else
      redirect_to sessions_create_path
  end

  def twitter_params
    params.require(:tweet).permit(:message)
  end
end
