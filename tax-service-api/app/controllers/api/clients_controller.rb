module Api
    class ClientsController < ApplicationController
      before_action :authenticate_user, except: [:create]
      before_action :set_client, only: [:update, :profile]
      
      def profile
        unless @client
          render json: { error: 'The logged-in user does not have an associated client.', action_required: true }, status: :not_found and return
        end
  
        render json: current_user_client, status: :ok
      end
  
      def update
        Rails.logger.debug "Update Action Called. Params: #{params.inspect}"
        ActiveRecord::Base.transaction do
          if params[:client][:ssn_encrypted].present?
            @client.ssn_encrypted = params[:client][:ssn_encrypted]
          end
  
          unless @client.update(client_params)
            Rails.logger.debug "Update failed for Client"
            raise ActiveRecord::Rollback
          end
        end
        Rails.logger.debug "Successfully updated Client and User"
        render json: current_user_client, status: :ok
      rescue ActiveRecord::Rollback
        Rails.logger.debug "Rollback occurred. Errors: #{@client.errors.full_messages}"
        render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
      end

      def create_spouse
        ActiveRecord::Base.transaction do
          spouse = Client.new(spouse_params)
          if spouse.save
            client = current_user.client
            client.update!(spouse_id: spouse.id)
            Rails.logger.info("Spouse successfully created and associated. Spouse ID: #{spouse.id}")
            render json: { spouse: spouse, clientId: client.id, message: 'Spouse successfully created and associated.' }, status: :created
          else
            Rails.logger.warn("Spouse creation failed. Errors: #{spouse.errors.full_messages}")
            render json: { errors: spouse.errors.full_messages }, status: :unprocessable_entity
            raise ActiveRecord::Rollback
          end
        end
      rescue ActiveRecord::Rollback
        Rails.logger.error("Transaction rolled back due to an error in spouse creation.")
      end

      def update_spouse
        spouse = Client.find(params[:id])
        if spouse.update(spouse_params)
          render json: { message: 'Spouse successfully updated.', spouse: spouse }, status: :ok
        else
          render json: { errors: spouse.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def destroy_spouse
        spouse = Client.find(params[:id])
        if spouse.destroy
          render json: { message: 'Spouse successfully removed.' }, status: :ok
        else
          render json: { errors: spouse.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      private
    
      def set_client
        @client = current_user&.client
      end

      def current_user_client
        client_json = {
            id: current_user.id,
            client_id: @client.id, 
            first_name: @client.first_name, 
            middle_name: @client.middle_name,
            last_name: @client.last_name,
            email: current_user.email,
            dob: @client.dob ? @client.dob.strftime('%Y-%m-%d') : nil,
            filing_status: @client.filing_status,
            driver_license_id: @client.driver_license_id,
            spouse_id: @client.spouse_id,
            number_of_dependents: @client.number_of_dependents,
            last_four_ssn: @client.last_four_ssn
        }

        if @client.spouse_id.present?
            spouse = Client.find_by(id: @client.spouse_id)
            client_json[:spouse] = {
                id: spouse.id,
                first_name: spouse.first_name, 
                middle_name: spouse.middle_name,
                last_name: spouse.last_name,
                dob: spouse.dob ? spouse.dob.strftime('%Y-%m-%d') : nil,
                filing_status: spouse.filing_status,
                driver_license_id: spouse.driver_license_id,
                last_four_ssn: spouse.last_four_ssn
            }
        end

        client_json
      end
      
      def client_params
        params.require(:client).permit(
            :first_name, 
            :last_name, 
            :middle_name, 
            :dob, 
            :filing_status, 
            :driver_license_id, 
            :number_of_dependents, 
            :ssn_encrypted
        )
      end

      def spouse_params
        params.require(:spouse).permit(
            :id,
            :first_name, 
            :last_name, 
            :middle_name,
            :dob, 
            :driver_license_id, 
            :ssn_encrypted,
            :spouse_of
        )
      end
      
    end
  end
  