class CreateResidences < ActiveRecord::Migration[7.0]
    def change
      create_table :residences do |t|
        t.references :client, null: false, foreign_key: true
        t.string :street_address, null: false
        t.string :apartment_number
        t.string :city, null: false
        t.string :state, null: false
        t.string :zip_code, null: false
        t.string :county, null: false
        t.boolean :is_primary_residence, default: false
        t.string :property_type
        t.string :ownership_status
  
        t.timestamps
      end
    end
  end
  