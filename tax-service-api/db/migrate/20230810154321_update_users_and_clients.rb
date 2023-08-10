class UpdateUsersAndClients < ActiveRecord::Migration[7.0]
    def change
      add_column :users, :first_name, :string, null: false
      add_column :users, :last_name, :string, null: false
      add_column :users, :middle_name, :string
  
      remove_column :clients, :full_name, :string
      add_column :clients, :first_name, :string, null: false
      add_column :clients, :last_name, :string, null: false
      add_column :clients, :middle_name, :string
    end
  end
  