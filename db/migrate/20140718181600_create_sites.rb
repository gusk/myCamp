class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.string :name
      t.string :latlong
      t.string :description
      t.string :type
    end
  end
end