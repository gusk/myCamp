class AddLatLongColumnToSites < ActiveRecord::Migration
  def change
    add_column(:sites, :lat, :float)
    add_column(:sites, :long, :float)
  end
end


