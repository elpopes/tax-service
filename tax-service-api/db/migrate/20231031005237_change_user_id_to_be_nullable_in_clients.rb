class ChangeUserIdToBeNullableInClients < ActiveRecord::Migration[7.0]
  def change
    change_column_null :clients, :user_id, true
  end
end
