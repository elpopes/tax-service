class RenameSsnLastFourColumn < ActiveRecord::Migration[7.0]
    def change
        rename_column :users, :ssn_last_four_encrypted, :encrypted_ssn_last_four
    end
end
  