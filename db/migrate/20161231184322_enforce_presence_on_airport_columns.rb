class EnforcePresenceOnAirportColumns < ActiveRecord::Migration[5.0]
  def change
    change_column :airports, :code, :string, null: false
    change_column :airports, :name, :string, null: false
    change_column :airports, :latitude, :decimal, null: false
    change_column :airports, :longitude, :decimal, null: false
  end
end
