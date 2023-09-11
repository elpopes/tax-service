class CreateDependents < ActiveRecord::Migration[7.0]
    def change
      create_table :dependents do |t|
        t.bigint :client_id, null: false
        t.date :dob
        t.binary :ssn_encrypted
        t.string :first_name, null: false
        t.string :middle_name
        t.string :last_name, null: false
        t.string :relationship_to_client, null: false
        t.timestamps
      end
  
      add_index :dependents, :client_id, name: 'index_dependents_on_client_id'
      add_foreign_key :dependents, :clients
    end
  end
  