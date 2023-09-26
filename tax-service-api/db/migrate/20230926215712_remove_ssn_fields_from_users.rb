class RemoveSsnFieldsFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :encrypted_ssn_last_four, :binary
    remove_column :users, :encrypted_ssn_last_four_iv, :string
  end
end
