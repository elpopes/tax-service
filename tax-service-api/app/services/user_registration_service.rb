class UserRegistrationService
    attr_reader :params
  
    def initialize(params)
      @params = params
    end
  
    def register
      user = build_user
      return { success: false, errors: user.errors.full_messages } unless user.save
  
      handle_client_creation(user) if user.client?
      { success: true, user: user }
    end
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four, :dob)
    end
  
    def build_user
      User.new(user_params.except(:dob))
    end
  
    def handle_client_creation(user)
      client = create_client(user, user_params[:dob])
      log_client_creation_failure(user, client) unless client.save
    end
  
    def create_client(user, dob)
      Client.new(
        user: user,
        dob: dob,
        ssn: user.ssn_last_four,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        ssn_last_four: user.ssn_last_four
      )
    end
  
    def log_client_creation_failure(user, client)
      Rails.logger.error("Client creation failed for user #{user.id}: #{client.errors.full_messages}")
    end
  end
  