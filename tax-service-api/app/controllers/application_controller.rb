class ApplicationController < ActionController::API
    def encode_token(payload)
        JWT.encode(payload, ENV['JWT_SECRET'])
    end

    def decoded_token(token)
        begin
            JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')[0]
        rescue JWT::ExpiredSignature
            nil
        end
    end
end
