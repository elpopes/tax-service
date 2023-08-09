class AddEncryptedSsnLastFourIvToUsers < ActiveRecord::Migration[7.0]
    def change
      add_column :users, :encrypted_ssn_last_four_iv, :string
      add_index :users, :encrypted_ssn_last_four_iv, unique: true
    end
end
  