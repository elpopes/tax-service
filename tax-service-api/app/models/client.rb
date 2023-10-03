class Client < ApplicationRecord
    attr_encrypted :ssn, key: ENV['ATTR_ENCRYPTION_KEY'], attribute: 'ssn_encrypted'
    belongs_to :user, optional: true 
    has_one :spouse
    has_many :dependents
  
    after_update :update_user
  
    enum filing_status: { single: 0, married_joint: 1, married_separate: 2, head_of_household: 3, widower: 4 }
  
    validates :user, presence: true, if: -> { user.present? }

    def encrypted_ssn_for_frontend
        return nil unless self.ssn
        EncryptionService.encrypt(self.ssn)
    end
      
    def decrypt_ssn_from_frontend(encrypted_data)
        EncryptionService.decrypt(encrypted_data[:iv], encrypted_data[:cipher_text])
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
  
end
  