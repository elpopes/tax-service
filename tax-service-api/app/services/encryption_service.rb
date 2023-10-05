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
    # Step 3: Log the received Base64 cipher text
    puts "Received Base64 Cipher Text: #{cipher_text_base64}"
    
    # Decode the base64 cipher text
    cipher_text = Base64.decode64(cipher_text_base64)
    
    # Step 2: Log the length of the cipher text
    puts "Cipher Text Length: #{cipher_text.bytesize * 8} bits"
    
    # Decode the private key from Base64 and assume it's in PEM format
    private_key_pem = Base64.decode64(ENV['PRIVATE_KEY_BASE64'])
  
    # Step 4: Log the decoded private key PEM
    puts "Decoded Private Key PEM: #{private_key_pem}"
    
    # Create an RSA private key object
    private_key = OpenSSL::PKey::RSA.new(private_key_pem)
    
    begin
      # Decrypt the cipher text using the RSA private key
      plain_text = private_key.private_decrypt(cipher_text, OpenSSL::PKey::RSA::PKCS1_OAEP_PADDING)
    rescue OpenSSL::PKey::RSAError => e
      # Step 5: Log any OpenSSL errors
      puts "OpenSSL Error: #{e.message}"
      raise
    end
    
    # Return the last 4 digits of the SSN
    plain_text[-4..-1]
  end
  
end
