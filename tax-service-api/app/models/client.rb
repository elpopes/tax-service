class Client < ApplicationRecord
    attr_encrypted :ssn, key: ENV['ATTR_ENCRYPTION_KEY']
    before_save :set_last_four_of_ssn
    belongs_to :user, optional: true 
    has_one :spouse
    has_many :dependents
  
    after_update :update_user
  
    enum filing_status: { single: 0, married_joint: 1, married_separate: 2, head_of_household: 3, widower: 4 }
  
    validates :user, presence: true, if: -> { user.present? }
  
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
  
    def set_last_four_of_ssn
        self.ssn_last_four = ssn&.last(4)
    end
  end
  