class CreateAirports < ActiveRecord::Migration[5.0]
  def change
    create_table :airports do |t|
      t.string :name
      t.string :code
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end

    add_index :airports, :code, unique: true
  end
end
