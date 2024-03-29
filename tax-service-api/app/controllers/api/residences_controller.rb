module Api
    class ResidencesController < ApplicationController
        before_action :set_client
        before_action :set_residence, only: [:show, :edit, :update, :destroy]
    
        # GET /clients/:client_id/residences
        def index
            @residences = @client.residences
            render json: @residences
          end
    
        # GET /clients/:client_id/residences/:id
        def show
        end
    
        # GET /clients/:client_id/residences/new
        def new
        @residence = @client.residences.build
        end
    
        # POST /clients/:client_id/residences
        def create
            @residence = @client.residences.build(residence_params)
            if @residence.save
            render json: @residence, status: :created
            else
            render json: @residence.errors, status: :unprocessable_entity
            end
        end
    
        # GET /clients/:client_id/residences/:id/edit
        def edit
        end
    
        # PATCH/PUT /clients/:client_id/residences/:id
        def update
            if @residence.update(residence_params)
                render json: @residence
            else
                render json: @residence.errors, status: :unprocessable_entity
            end
        end
  
    
        # DELETE /clients/:client_id/residences/:id
        def destroy
            if @residence.destroy
                head :no_content
            else
                render json: @residence.errors, status: :unprocessable_entity
            end
        end
    
        private
    
        def set_client
            @client = Client.find(params[:client_id])
        end
    
        def set_residence
            @residence = @client.residences.find(params[:id])
        end
    
        def residence_params
            params.require(:residence).permit(:street_address, :apartment_number, :city, :state, :zip_code, :county, :is_primary_residence, :property_type, :ownership_status)
        end
    end
end