class Client < ApplicationRecord
    belongs_to :user
  
    enum filing_status: { single: 0, married_joint: 1, married_separate: 2, head_of_household: 3, widower: 4 }
  
    validates :user, presence: true
    validates :full_name, presence: true
    validates :ssn, presence: true, uniqueness: true
    validates :dob, presence: true
end
  