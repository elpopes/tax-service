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

  def self.decrypt(iv, cipher_text)
    decipher = OpenSSL::Cipher.new('aes-256-gcm')
    decipher.decrypt
    decipher.key = PRIVATE_KEY.private_decrypt(data)
    decipher.iv = iv

    decipher.update(cipher_text) + decipher.final
  end
end
