class AddSsnLastFourEncryptedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :ssn_last_four_encrypted, :binary
  end
end
