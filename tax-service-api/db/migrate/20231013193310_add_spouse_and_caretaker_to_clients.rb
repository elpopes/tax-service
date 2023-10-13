class AddSpouseAndCaretakerToClients < ActiveRecord::Migration[7.0]
  def change
    add_column :clients, :spouse_id, :bigint, index: true, null: true
    add_column :clients, :caretaker_id, :bigint, index: true, null: true
  end
end
