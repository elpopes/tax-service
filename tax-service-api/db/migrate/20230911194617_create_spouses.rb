class CreateSpouses < ActiveRecord::Migration[7.0]
    def change
      create_table :spouses do |t|
        t.bigint :client_id, null: false
        t.date :dob
        t.binary :ssn_encrypted
        t.string :first_name, null: false
        t.string :last_name, null: false
        t.timestamps
      end
  
      add_index :spouses, :client_id, name: 'index_spouses_on_client_id'
      add_foreign_key :spouses, :clients
    end
  end
  