class ApplicationController < ActionController::API
    def encode_token(payload)
        payload[:exp] = Time.now.to_i + 4 * 3600 # Expires in 4 hours
        JWT.encode(payload, ENV['JWT_SECRET'])
    end
    
    def decoded_token(token)
        begin
            JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')[0]
        rescue JWT::ExpiredSignature, JWT::DecodeError
            nil
        end
    end

    def current_user
        header = request.headers['Authorization']
        if header
            token = header.split(' ').last
            if token
                decoded = decoded_token(token)
                return User.find_by(id: decoded["user_id"]) if decoded
            end
        end
        nil
    end    
    

    def authenticate_user
        @current_user = current_user
        unless @current_user
            render json: {message: "Invalid token"}, status: :unauthorized
        end
    end
end
