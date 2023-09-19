class ClientsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_client, only: [:update]
  
    def update
      if @client.update(client_params) && @client.user.update(user_params)
        render json: @client, status: :ok
      else
        render json: { errors: @client.errors.full_messages + @client.user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_client
      @client = current_user.client
    end
  
    def client_params
      params.require(:client).permit(:filing_status, :dob, :driver_license_id, :first_name, :last_name, :middle_name, :ssn_last_four)
    end
  
    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :middle_name)
    end
  end
  