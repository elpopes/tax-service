class User < ApplicationRecord
    # Encryption key from .env
    ENCRYPTION_KEY = ENV['ATTR_ENCRYPTION_KEY']
  
    # Enums
    enum role: { client: 0, tax_professional: 1, admin: 2 }
  
    # Devise modules
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :confirmable, :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist
  
    # attr_encrypted setup
    attr_encrypted :ssn_last_four, key: ENV['ATTR_ENCRYPTION_KEY'], attribute: 'encrypted_ssn_last_four'
  
    # Associations
    has_many :refresh_tokens
    has_one :client
    accepts_nested_attributes_for :client
  
    # Callbacks
    after_initialize :ensure_role
    after_create :create_associated_client, if: :client?
  
    # Validations
    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :ssn_last_four, length: { is: 4 }, allow_nil: true
  
    private
  
    def create_associated_client
      client = create_client(
        first_name: self.first_name,
        last_name: self.last_name,
        middle_name: self.middle_name,
        ssn_last_four: self.ssn_last_four
      )
      
      unless client.persisted?
        Rails.logger.error("Client creation failed with errors: #{client.errors.full_messages}")
        client.errors.full_messages.each do |message|
          errors.add(:base, "Client: #{message}")
        end
        throw :abort
      end
    end
  
    def ensure_role
      self.role ||= :client
    end
end
  