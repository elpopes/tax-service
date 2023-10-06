require 'openssl'

module EncryptionService
#   def self.encrypt(data)
#     cipher = OpenSSL::Cipher.new('aes-256-gcm')
#     cipher.encrypt
#     cipher.key = PRIVATE_KEY.public_encrypt(data)
#     cipher.iv = iv = cipher.random_iv

#     cipher_text = cipher.update(data) + cipher.final

#     {
#       iv: iv,
#       cipher_text: cipher_text
#     }
#   end

    def self.decrypt(cipher_text_base64)
        begin
            private_key_base64 = ENV['PRIVATE_KEY_BASE64']
            cipher_text = Base64.decode64(cipher_text_base64)
            private_key = OpenSSL::PKey::RSA.new(Base64.decode64(private_key_base64))
  
        decrypted_text = private_key.private_decrypt(cipher_text, OpenSSL::PKey::RSA::PKCS1_OAEP_PADDING)
      
        decrypted_text
        rescue OpenSSL::PKey::RSAError => e
            Rails.logger.error "Specific OpenSSL Error: #{e.message}"
            nil
        rescue StandardError => e
            Rails.logger.error "General Error: #{e.message}"
            nil
        end
    end
  
  
end
