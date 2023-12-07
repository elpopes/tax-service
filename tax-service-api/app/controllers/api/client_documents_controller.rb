module Api
    class ClientDocumentsController < ApplicationController
      before_action :authenticate_user
      before_action :set_client
  
      def create
        @client_document = @client.client_documents.new(client_document_params)
  
        if @client_document.save
          if @client_document.upload_to_s3(params[:document])
            @client_document.update(status: :processed)
            render json: { message: "Document uploaded and processed successfully" }, status: :ok
          else
            @client_document.update(status: :failed)
            render json: { message: "Failed to upload document" }, status: :unprocessable_entity
          end
        else
          render json: @client_document.errors, status: :unprocessable_entity
        end
      end
  
      private
  
      def client_document_params
        params.require(:client_document).permit(:file_name, :document_type, :tax_year)
      end
  
      def set_client
        @client = Client.find(params[:clientId])
      end
    end
  end
  