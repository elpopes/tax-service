class UserRegistrationService
    attr_reader :params
  
    def initialize(params)
      @params = params
    end
  
    def register
      dob = params[:user][:dob] # Extracting the dob
      user_params_without_dob = user_params.except(:dob) # Removing dob from user params
      user = User.new(user_params_without_dob)
      
      if user.save
        if user.role == 'client'
          create_client(user, dob) # Creating a client if the user is a client
        end
        { success: true, user: user }
      else
        { success: false, errors: user.errors.full_messages }
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four, :dob)
    end
  
    def create_client(user, dob)
      # Logic to create a client using the user and dob
    end
  end
  