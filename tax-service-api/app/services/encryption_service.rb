require 'openssl'

module EncryptionService
  def self.encrypt(data)
    cipher = OpenSSL::Cipher.new('aes-256-gcm')
    cipher.encrypt
    cipher.key = PRIVATE_KEY.public_encrypt(data)
    cipher.iv = iv = cipher.random_iv

    cipher_text = cipher.update(data) + cipher.final

    {
      iv: iv,
      cipher_text: cipher_text
    }
  end

  def self.decrypt(cipher_text_base64)
    begin
      private_key_base64 = ENV['PRIVATE_KEY_BASE64']
      public_key_base64 = ENV['PUBLIC_KEY_BASE64']

      puts "Base64-Encoded Cipher Text: #{cipher_text_base64}"

      cipher_text = Base64.decode64(cipher_text_base64)
      private_key = OpenSSL::PKey::RSA.new(Base64.decode64(private_key_base64))
      public_key = OpenSSL::PKey::RSA.new(Base64.decode64(public_key_base64))

      puts "Decoded Cipher Text: #{cipher_text}"
      puts "Decoded Private Key: #{private_key_base64}"
      puts "Private Key Object: #{private_key}"

      # Test encryption and decryption within the method
      test_text = "Hello World!"
      cipher = OpenSSL::Cipher::AES.new(256, :CBC)
      cipher.encrypt
      encrypted_test_text = public_key.public_encrypt(test_text, OpenSSL::PKey::RSA::PKCS1_OAEP_PADDING)
      decrypted_test_text = private_key.private_decrypt(encrypted_test_text, OpenSSL::PKey::RSA::PKCS1_OAEP_PADDING)
      
      puts "Decrypted Test Text: #{decrypted_test_text}"

      # Actual decryption
      decrypted_text = private_key.private_decrypt(cipher_text, OpenSSL::PKey::RSA::PKCS1_OAEP_PADDING)

      puts "Successfully decrypted text: #{decrypted_text}"
      decrypted_text
    rescue OpenSSL::PKey::RSAError => e
      puts "Specific OpenSSL Error: #{e.message}"
      nil
    rescue StandardError => e
      puts "General Error: #{e.message}"
      nil
    end
  end
  
end
