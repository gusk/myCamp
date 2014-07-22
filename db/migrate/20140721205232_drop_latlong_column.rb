class DropLatlongColumn < ActiveRecord::Migration
  def change
    drop_table :lat_long_columns
  end
end
