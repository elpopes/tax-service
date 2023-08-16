class UserRegistrationService
    attr_reader :params
  
    def initialize(params)
      @params = params
    end
  
    def register
        dob = params[:user][:dob] # Extracting the dob
        user_params_without_dob = user_params.except(:dob) # Removing dob from user params
      
        Rails.logger.info("User Parameters: #{user_params_without_dob}")
      
        user = User.new(user_params_without_dob)
        
        if user.save
          if user.role == 'client'
            create_client(user, dob) # Creating a client if the user is a client
          end
          { success: true, user: user }
        else
          # Debugging: Print user errors if saving fails
          Rails.logger.error("User saving failed: #{user.errors.full_messages}")
          { success: false, errors: user.errors.full_messages }
        end
    end
      
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four, :dob)
    end
  
    def create_client(user, dob)
        client_params = {
          user: user,
          dob: dob,
          ssn: user.ssn_last_four,
          first_name: user.first_name,
          last_name: user.last_name,
          middle_name: user.middle_name,
          ssn_last_four: user.ssn_last_four 
        }
      
        client = Client.new(client_params)
      
        unless client.save
          Rails.logger.error("Client creation failed for user #{user.id}: #{client.errors.full_messages}")
        end
    end
      
  end
  