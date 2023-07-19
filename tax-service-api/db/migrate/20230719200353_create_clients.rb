class CreateClients < ActiveRecord::Migration[7.0]
    def change
      create_table :clients do |t|
        t.references :user, null: false, foreign_key: true
        t.string :full_name, null: false
        t.integer :filing_status
        t.date :dob
        t.string :ssn
        t.references :driver_license
  
        t.timestamps
      end
    end
  end
  