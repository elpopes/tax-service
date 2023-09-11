class Client < ApplicationRecord
    attr_encrypted :ssn, key: ENV['ATTR_ENCRYPTION_KEY']
    belongs_to :user
    has_one :spouse
    has_many :dependents
  
    enum filing_status: { single: 0, married_joint: 1, married_separate: 2, head_of_household: 3, widower: 4 }
  
    validates :user, presence: true
    validates :ssn, presence: true
    validates :dob, presence: true
  
    def full_name
      [first_name, middle_name, last_name].compact.join(' ')
    end
end
  
  
  