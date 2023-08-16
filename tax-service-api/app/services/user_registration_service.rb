class UserRegistrationService
    attr_reader :params
  
    def initialize(params)
      @params = params
    end
  
    def register
      user = User.new(user_params)
      if user.save
        { success: true, user: user }
      else
        { success: false, errors: user.errors.full_messages }
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four)
    end
  end
  