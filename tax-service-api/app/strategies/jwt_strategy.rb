require 'warden'

module Warden
  module Strategies
    class JWT < Base
      def valid?
        token.present?
      end

      def authenticate!
        payload = decode_token

        if payload && user = User.find_by(id: payload['user_id'])
          success!(user)
        else
          fail!('Failed to authenticate')
        end
      end

      private

      def token
        bearer = request.headers['Authorization']&.split(' ')&.last
      end

      def decode_token
        JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'], true, { algorithm: 'HS256' })
      rescue JWT::DecodeError
        nil
      end
      
    end
  end
end

Warden::Strategies.add(:jwt, Warden::Strategies::JWT)
