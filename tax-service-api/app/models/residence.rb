class Residence < ApplicationRecord
    belongs_to :client
  
    validates :street_address, :city, :state, :zip_code, :county, presence: true
  
    enum property_type: { condo: 0, apartment: 1, single_family_home: 2, townhouse: 3 }
    enum ownership_status: { owned: 0, rented: 1, leased: 2 }
  
    scope :primary_residences, -> { where(is_primary_residence: true) }
    scope :by_state, -> (state) { where(state: state) }
  
    def rental_property?
      ownership_status == 'rented' || ownership_status == 'leased'
    end
  
  end
  