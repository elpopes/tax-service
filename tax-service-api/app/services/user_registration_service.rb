class UserRegistrationService
    attr_reader :params, :user
  
    def initialize(params)
      @params = params
      @user = User.new(sign_up_params)
    end
  
    def register
      if @user.save
        if @user.active_for_authentication?
          handle_client_creation if @params[:user][:role] == 'client'
          { success: true, user: @user }
        else
          { success: false, errors: @user.errors.full_messages }
        end
      else
        { success: false, errors: @user.errors.full_messages }
      end
    end
  
    private
  
    def sign_up_params
      params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four)
    end
  
    def handle_client_creation
      # Logic for handling client creation including 'dob'
    end
  end
  