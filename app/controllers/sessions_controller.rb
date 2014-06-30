class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by_email(params[:email])

    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      flash[:success] = 'Login Successful'
      redirect_to user_path(user.id)
    else
      flash.now[:error] = "#{params[:email]} is not a registered email. Please register."
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = 'You have successfully logged out.'
    redirect_to root_path
  end
end