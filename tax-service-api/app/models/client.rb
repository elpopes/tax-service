class Client < ApplicationRecord
    belongs_to :user, optional: true
    has_one :spouse
    has_many :dependents
  
    # Validate presence of iv when encrypted_data is present
    validates :encrypted_data, presence: true, if: -> { iv.present? }
    validates :iv, presence: true, if: -> { encrypted_data.present? }
    
    enum filing_status: { single: 0, married_joint: 1, married_separate: 2, head_of_household: 3, widower: 4 }
    
    validates :user, presence: true, if: -> { user.present? }
  
    def decrypt_ssn
        return nil unless ssn_encrypted.present? && iv.present?
        EncryptionService.decrypt(ssn_encrypted, iv)
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
end
  