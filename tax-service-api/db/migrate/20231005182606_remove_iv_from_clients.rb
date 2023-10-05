class RemoveIvFromClients < ActiveRecord::Migration[7.0]
  def change
    remove_column :clients, :iv, :string
  end
end
