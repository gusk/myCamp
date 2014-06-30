class CampsitesController < ApplicationController
  def index
    @campsites = Campsite.all
  end

  def show
    @campsite = Campsite.find_by(:id)
  end

  def new
    @campsite = Campsite.new
  end

  def create
    @campsite = Campsite.new(allowed_parameters)
    if @campsite.save
      flash[:notice] = "Successfully added, #{@campsite.name} to your camp list."
      redirect_to campsites_path
      #redirect_to users_campsite_path(params[:user_id])
    else
      render :new
    end

  end

  def allowed_parameters
    params.require(:campsite).permit(
      :name,
      :city,
      :state
    )
  end
end