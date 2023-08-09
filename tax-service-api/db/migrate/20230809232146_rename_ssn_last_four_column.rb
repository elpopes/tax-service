class RenameSsnLastFourColumn < ActiveRecord::Migration[7.0]
    def change
      rename_column :users, :encrypted_ssn_last_four, :ssn_last_four_encrypted
    end
end
  