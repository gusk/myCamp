class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :log_user_in

  def log_user_in(user)
    session[:user_id] = user.id
  end


  helper_method :current_user

  def current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end
end
