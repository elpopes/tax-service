class User < ApplicationRecord
    # Enums
    enum role: { client: 0, tax_professional: 1, admin: 2 }
  
    # Associations
    has_many :refresh_tokens
  
    # Callbacks
    after_initialize :ensure_role
  
    # Validations
    validates :email, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
  
    # Attributes
    attr_reader :password
  
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      user&.is_password?(password) ? user : nil
    end
  
    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end
  
    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  
    private
  
    def ensure_role
      self.role ||= :client
    end
end
