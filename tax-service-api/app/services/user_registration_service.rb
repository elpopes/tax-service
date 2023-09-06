class UserRegistrationService
    attr_reader :user_params, :client_params
  
    def initialize(user_params, client_params = nil)
      @user_params = user_params
      @client_params = client_params
    end
  
    def register
      user = build_user
  
      unless user.save
        return { success: false, errors: user.errors.full_messages }
      end
  
      if client_params
        client_creation_result = handle_client_creation(user)
  
        unless client_creation_result[:success]
          return client_creation_result
        end
      end
  
      { success: true, user: user }
    end
  
    private
  
    def build_user
      User.new(user_params)
    end
  
    def handle_client_creation(user)
      client = create_client(user)
      unless client.save
        log_client_creation_failure(user, client)
        return { success: false, errors: client.errors.full_messages }
      end
      { success: true, client: client }
    end
  
    def create_client(user)
      Client.new(
        user: user,
        **client_params.symbolize_keys
      )
    end
  
    def log_client_creation_failure(user, client)
      Rails.logger.error("Client creation failed for user #{user.id}: #{client.errors.full_messages}")
    end
  end
  