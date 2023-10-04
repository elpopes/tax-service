class AddIvToClients < ActiveRecord::Migration[7.0]
  def change
    add_column :clients, :iv, :string
  end
end
