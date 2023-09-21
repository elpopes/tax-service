class Client < ApplicationRecord
    attr_encrypted :ssn, key: ENV['ATTR_ENCRYPTION_KEY']
    belongs_to :user
    has_one :spouse
    has_many :dependents

    after_update :update_user
  
    enum filing_status: { single: 0, married_joint: 1, married_separate: 2, head_of_household: 3, widower: 4 }
  
    validates :user, presence: true
    validates :ssn, presence: true, if: -> { ssn.present? }
    validates :dob, presence: true, if: -> { dob.present? }
  
    def full_name
      [first_name, middle_name, last_name].compact.join(' ')
    end

    private

    def update_user(
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName
    )
  end
  
  