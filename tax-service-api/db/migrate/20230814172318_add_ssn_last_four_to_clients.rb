class AddSsnLastFourToClients < ActiveRecord::Migration[7.0]
    def change
        add_column :clients, :ssn_last_four, :string, limit: 4
    end
end
