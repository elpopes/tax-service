class Spouse < ApplicationRecord
    belongs_to :client
  
    attr_encrypted :ssn, key: Rails.application.credentials.encryption_key
  end