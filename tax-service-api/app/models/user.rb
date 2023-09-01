class User < ApplicationRecord
    # Enums
    enum role: { client: 0, tax_professional: 1, admin: 2 }
  
    # Devise modules
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist
  
    # Associations
    has_many :refresh_tokens
    has_one :client
    accepts_nested_attributes_for :client
  
    # Validations
    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :ssn_last_four, length: { is: 4 }, allow_nil: true
  
    # Encrypted fields
    attr_encrypted :ssn_last_four, key: encryption_key, attribute: 'encrypted_ssn_last_four'
  
    def self.encryption_key
      ENV['ATTR_ENCRYPTION_KEY']
    end
  
    def ensure_role
      self.role ||= :client
    end
  end
  