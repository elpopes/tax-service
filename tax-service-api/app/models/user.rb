class User < ApplicationRecord
    has_secure_password
  
    validates :email, presence: true, uniqueness: true
  
    enum role: { client: 0, tax_professional: 1, admin: 2 }
  end
  