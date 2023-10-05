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

  def self.decrypt(cipher_text)
    decipher = OpenSSL::Cipher.new('aes-256-gcm')
    decipher.decrypt
    
    # Convert the base64 encoded key from the environment variable to binary
    private_key_binary = Base64.decode64(ENV['PRIVATE_KEY_BASE64'])
    
    # Create an RSA object
    private_key = OpenSSL::PKey::RSA.new(private_key_binary)
    
    # Set the key for decryption
    decipher.key = private_key.to_s
    
    # Decrypt
    decipher.update(cipher_text) + decipher.final
  end
  
end
