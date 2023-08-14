module Api
    class RegistrationsController < Devise::RegistrationsController
      before_action :configure_permitted_parameters
      respond_to :json
  
      def create
        puts sign_up_params
        build_resource(sign_up_params)
  
        if resource.save
          if resource.active_for_authentication?
            sign_up(resource_name, resource)
            render json: resource, status: :created
          else
            render json: { errors: resource.errors.full_messages }, status: :not_acceptable
          end
        else
            puts "Resource Errors: #{resource.errors.full_messages.inspect}"
            clean_up_passwords resource
            render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
        protected

        def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four])
        end

        private

        def sign_up_params
            params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four)
        end
    end
end
  
  