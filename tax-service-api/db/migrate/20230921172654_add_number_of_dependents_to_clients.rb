class AddNumberOfDependentsToClients < ActiveRecord::Migration[7.0]
  def change
    add_column :clients, :number_of_dependents, :integer
  end
end
