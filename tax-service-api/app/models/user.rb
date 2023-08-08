class User < ApplicationRecord
    # Enums
    enum role: { client: 0, tax_professional: 1, admin: 2 }
  
    # Devise modules
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist
  
    # Associations
    has_many :refresh_tokens
    has_one :client
    accepts_nested_attributes_for :client
  
    # Callbacks
    after_initialize :ensure_role
    after_create :create_associated_client
  
    # Validations
    validates :email, presence: true, uniqueness: true
    validates :password, length: {minimum: 6, allow_nil: true}
  
    private

    def create_associated_client
        create_client! if client?
    end
  
    def ensure_role
        self.role ||= :client
    end
end
