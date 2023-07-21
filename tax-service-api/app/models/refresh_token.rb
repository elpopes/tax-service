class RefreshToken < ApplicationRecord
    belongs_to :user
  
    validates :token, presence: true
    validates :expires_at, presence: true
  
    before_create :hash_token
  
    private
  
    def hash_token
      self.token = Digest::SHA256.hexdigest(token)
    end
  end