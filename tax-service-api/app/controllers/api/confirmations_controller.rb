module Api
    class ConfirmationsController < Devise::ConfirmationsController
        def show
            self.resource = resource_class.confirm_by_token(params[:confirmation_token])
        
            if resource.errors.empty?
              redirect_to "http://localhost:5000/email-confirmed"
            else
              redirect_to "http://localhost:5000/email-confirmation-failure"
            end
        end
    end
end