class CreateLatLongColumns < ActiveRecord::Migration
  def change
    create_table :lat_long_columns do |t|
      t.float :lat
      t.float :long
    end
  end
end
