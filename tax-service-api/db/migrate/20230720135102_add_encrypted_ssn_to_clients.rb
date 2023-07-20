class AddEncryptedSsnToClients < ActiveRecord::Migration[7.0]
    def up
      # Add the new encrypted column
      add_column :clients, :ssn_encrypted, :binary
  
      # Encrypt and migrate data from the old column to the new column
      Client.reset_column_information
      Client.find_each do |client|
        ssn_encrypted = ActiveRecord::Base.connection.raw_connection.exec(
          "SELECT pgp_sym_encrypt(#{client.ssn}, #{ENV['DB_ENCRYPTION_KEY']})"
        ).first['pgp_sym_encrypt']
        client.update_column(:ssn_encrypted, ssn_encrypted)
      end
  
      # Remove the old unencrypted column
      remove_column :clients, :ssn
    end
  
    def down
      # Add the old unencrypted column
      add_column :clients, :ssn, :string
  
      # Decrypt and migrate data from the new column to the old column
      Client.reset_column_information
      Client.find_each do |client|
        ssn = ActiveRecord::Base.connection.raw_connection.exec(
          "SELECT pgp_sym_decrypt(#{client.ssn_encrypted}, #{ENV['DB_ENCRYPTION_KEY']})"
        ).first['pgp_sym_decrypt']
        client.update_column(:ssn, ssn)
      end
  
      # Remove the new encrypted column
      remove_column :clients, :ssn_encrypted
    end
  end
  