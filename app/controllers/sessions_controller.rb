class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by email: params[:user][:email]

    if user.present? && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      flash[:success] = 'Login Successful'
      redirect_to user_path(user.id)
    else
      @user = User.new
      flash.now[:error] = "Incorrect password or #{params[:user][:email]} is not a registered email. Please register."
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = 'You have successfully logged out.'
    redirect_to root_path
  end
end