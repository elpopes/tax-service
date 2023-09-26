class RemoveSsnLastFourFromClients < ActiveRecord::Migration[7.0]
  def change
    remove_column :clients, :ssn_last_four, :string
  end
end
