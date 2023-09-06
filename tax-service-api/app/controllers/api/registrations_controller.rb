module Api
    class RegistrationsController < Devise::RegistrationsController
      before_action :configure_permitted_parameters
      respond_to :json
  
      def create
        debugger
        registration_service = UserRegistrationService.new(sign_up_params)
        result = registration_service.register
      
        if result[:success]
          sign_up(resource_name, result[:user])
          render json: result[:user], status: :created
        else
          render json: { errors: result[:errors] }, status: :unprocessable_entity
        end
      end
  
        protected

        def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four, :dob])
        end
          

        private

        def sign_up_params
            params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four, :dob)
        end  
    end
end
  
  