class CreateClientDocuments < ActiveRecord::Migration[7.0]
    def change
        create_table :client_documents do |t|
          t.references :client, foreign_key: true
          t.integer :document_type
          t.string :file_name
          t.string :file_path
          t.datetime :uploaded_at
          t.integer :status
          t.integer :tax_year
    
          t.timestamps
        end
    
        add_index :client_documents, :document_type 
    end
end