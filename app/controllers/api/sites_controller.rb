module Api
  class SitesController < ApplicationController
    def index
      @sites = Site.all
      render json: @sites
    end

    def create
      @site = Site.new(name: params['name'], description: params['description'], site_type: params['site_type'], latlong: params['latlong'])
      if @site.save
        render json: @site
      else
        flash.now[:error] = "Could not save site"
        render status: 422
      end
    end

    def destroy
      Site.find_by_id(params[:id]).try(:destroy)
      render nothing: true
    end
  end
end