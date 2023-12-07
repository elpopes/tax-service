class Client < ApplicationRecord
    belongs_to :user, optional: true
    has_one :spouse, class_name: 'Client', foreign_key: 'spouse_id'
    has_many :dependents, class_name: 'Client', foreign_key: 'caretaker_id'
    has_many :residences
    has_many :client_documents
    enum filing_status: { single: 0, married_joint: 1, married_separate: 2, head_of_household: 3, widower: 4 }
    
    validates :user, presence: true, if: -> { user.present? }

    before_destroy :nullify_spouse_id_in_client
  
    def decrypt_ssn
      return nil unless ssn_encrypted.present?
      EncryptionService.decrypt(ssn_encrypted)
    end
  
    def last_four_ssn
      decrypted_ssn = decrypt_ssn
      decrypted_ssn[-4..-1] if decrypted_ssn
    end
    
    def full_name
      [first_name, middle_name, last_name].compact.join(' ')
    end
    
    private
    
    def update_user
      if user
        user.update(
          first_name: self.first_name,
          last_name: self.last_name,
          middle_name: self.middle_name
        )
      end
    end

    def nullify_spouse_id_in_client
        puts "Before destroy is being executed." # Step 1: Check Callback Execution
      
        begin
          client_with_spouse = Client.find_by(spouse_id: self.id)
          
          # Step 2: Inspect client_with_spouse
          puts "Found client with spouse: #{client_with_spouse.inspect}"
          
          client_with_spouse&.update(spouse_id: nil)
        rescue => e
          # Step 3: Check for Exceptions
          puts "An exception occurred: #{e.message}"
        end
      end
end
  