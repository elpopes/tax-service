require 'openssl'
require 'base64'

if ENV['PRIVATE_KEY_BASE64'].present? && ENV['PUBLIC_KEY_BASE64'].present?
  private_key_pem = Base64.decode64(ENV['PRIVATE_KEY_BASE64'])
  public_key_pem = Base64.decode64(ENV['PUBLIC_KEY_BASE64'])

  PRIVATE_KEY = OpenSSL::PKey::RSA.new(private_key_pem)
  PUBLIC_KEY = OpenSSL::PKey::RSA.new(public_key_pem)
else
  raise "Base64 encoded private and public keys must be set in .env"
end
