module Api
    class ClientsController < ApplicationController
        before_action :authenticate_user, except: [:create]
        before_action :set_client, only: [:update, :profile]

        def profile
            unless @client
              render json: { error: 'The logged-in user does not have an associated client.', action_required: true }, status: :not_found and return
            end
      
            render json: {
                id: current_user.id,
                client_id: @client.id, 
                first_name: @client.first_name, 
                middle_name: client.middle_name,
                last_name: client.last_name,
                email: current_user.email,
                date_of_birth: client.dob ? client.dob.strftime('%m-%d-%Y') : nil,
                filing_status: client.filing_status,
                driver_license_id: client.driver_license_id,
                number_of_dependents: client.number_of_dependents,
                ssnLastFour: client.ssn_last_four
            }, status: :ok
          end
    
        def update
            Rails.logger.debug "Update Action Called. Params: #{params.inspect}"
            ActiveRecord::Base.transaction do
              unless @client.update(client_params)
                Rails.logger.debug "Update failed for Client"
                raise ActiveRecord::Rollback
              end
            end
            Rails.logger.debug "Successfully updated Client and User"
            render json: @client, status: :ok
          rescue ActiveRecord::Rollback
            Rails.logger.debug "Rollback occurred. Errors: #{@client.errors.full_messages}"
            render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
        end
        
        private
    
        def set_client
            @client = current_user.client
        end
    
        def client_params
            params.require(:client).permit(:first_name, :last_name, :middle_name, :dob, :filing_status, :driver_license_id, :number_of_dependents, :ssn)
        end
          
    end
end
    