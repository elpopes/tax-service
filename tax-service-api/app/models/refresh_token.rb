class RefreshToken < ApplicationRecord
    belongs_to :user
  
    validates :token, presence: true
    validates :expires_at, presence: true
  
    before_validation :generate_token, :set_expiration_date, on: :create
    after_validation :hash_token, if: -> { errors.blank? }
  
    private
  
    def generate_token
      self.token = SecureRandom.hex(10)
    end
  
    def set_expiration_date
      self.expires_at = 1.week.from_now
    end
  
    def hash_token
      self.token = Digest::SHA256.hexdigest(token)
    end
end
  