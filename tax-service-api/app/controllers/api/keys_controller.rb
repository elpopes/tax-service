module Api
    class KeysController < ApplicationController
      def public_key
        render json: { publicKey: PUBLIC_KEY.to_pem }
      end
    end
end