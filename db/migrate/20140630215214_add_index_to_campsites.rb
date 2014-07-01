class AddIndexToCampsites < ActiveRecord::Migration
  def change
    add_column :campsites, :user, :string
    add_index :campsites, :user
  end
end