class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(allowed_parameters)
    if @user.save
      log_user_in(@user)
      flash[:notice] = "Thanks for registering, #{@user.first_name}!"
      redirect_to current_user
    else
      render :new
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def allowed_parameters
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
    )
  end
end