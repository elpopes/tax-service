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

          if @client.spouse_id.present?
            spouse = Client.find(@client.spouse_id)
            spouse.update(filing_status: @client.filing_status)
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
            spouse.filing_status = client.filing_status
            updated_spouse = spouse.attributes.merge(last_four_ssn: spouse.last_four_ssn)
            Rails.logger.info("Spouse successfully created and associated. Spouse ID: #{spouse.id}")
            render json: { spouse: updated_spouse, clientId: client.id, message: 'Spouse successfully created and associated.' }, status: :created
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
        main_client = Client.find(params[:id])
        spouse = Client.find_by(id: main_client.spouse_id)
      
        if spouse.nil?
          render json: { error: 'Spouse not found' }, status: :not_found and return
        end
      
        if spouse.update(spouse_params)
          Rails.logger.info("Spouse updated. Last Four SSN: #{spouse.last_four_ssn}")
          updated_spouse = spouse.attributes.merge(last_four_ssn: spouse.last_four_ssn)
          render json: { message: 'Spouse successfully updated.', spouse: updated_spouse }, status: :ok
        else
          render json: { errors: spouse.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      
  
      def destroy_spouse
        client = Client.find(params[:id])
        spouse = Client.find_by(id: client.spouse_id)
      
        if spouse.nil?
          render json: { error: 'No spouse found for this client.' }, status: :not_found and return
        end
      
        if spouse.destroy
          client.update(spouse_id: nil)
          render json: { message: 'Spouse successfully removed.' }, status: :ok
        else
          render json: { errors: spouse.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      def create_dependent
        ActiveRecord::Base.transaction do
          dependent = Client.new(dependent_params)
          if dependent.save
            client = current_user.client
            client.dependents << dependent
            Rails.logger.info("Dependent successfully created. Dependent ID: #{dependent.id}")
            render json: {
              id: dependent.id,
              first_name: dependent.first_name,
              middle_name: dependent.middle_name,
              last_name: dependent.last_name,
              dob: dependent.dob ? dependent.dob.strftime('%Y-%m-%d') : nil,
              last_four_ssn: dependent.last_four_ssn
            }, status: :created
          else
            Rails.logger.warn("Dependent creation failed. Errors: #{dependent.errors.full_messages}")
            render json: { errors: dependent.errors.full_messages }, status: :unprocessable_entity
            raise ActiveRecord::Rollback
          end
        end
      rescue ActiveRecord::Rollback
        Rails.logger.error("Transaction rolled back due to an error in dependent creation.")
      end
      
  
      def update_dependent
        dependent = Client.find(params[:id])
        if dependent.update(dependent_params)
          Rails.logger.info("Dependent updated. Last Four SSN: #{dependent.last_four_ssn}")
          updated_dependent = dependent.attributes.merge(last_four_ssn: dependent.last_four_ssn)
          render json: { message: 'Dependent successfully updated.', dependent: updated_dependent }, status: :ok
        else
          render json: { errors: dependent.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def destroy_dependent
        dependent = Client.find(params[:id])
        if dependent.destroy
          render json: { message: 'Dependent successfully removed.' }, status: :ok
        else
          render json: { errors: dependent.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      private
    
      def set_client
        @client = current_user&.client
      end

      def current_user_client
        client_json = {
            id: @client.id, 
            user_id: @client.user_id,
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
                driver_license_id: spouse.driver_license_id,
                last_four_ssn: spouse.last_four_ssn
            }
        end

        dependents = Client.where(caretaker_id: @client.id)
        if dependents.any?
            client_json[:dependents] = dependents.map do |dependent|
                {
                id: dependent.id,
                first_name: dependent.first_name,
                middle_name: dependent.middle_name,
                last_name: dependent.last_name,
                dob: dependent.dob ? dependent.dob.strftime('%Y-%m-%d') : nil,
                last_four_ssn: dependent.last_four_ssn
                }
            end
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
            :first_name, 
            :last_name, 
            :middle_name,
            :dob, 
            :driver_license_id, 
            :ssn_encrypted,
            :spouse_of
        )
      end

      def dependent_params
        params.require(:dependent).permit(
            :first_name, 
            :last_name, 
            :middle_name,
            :dob, 
            :driver_license_id, 
            :ssn_encrypted,
            :caretaker_id
        )
      end
      
    end
  end
  