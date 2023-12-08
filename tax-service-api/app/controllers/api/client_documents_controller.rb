module Api
    class ClientDocumentsController < ApplicationController
      before_action :authenticate_user
      before_action :set_client
  
      def create
        @client_document = @client.client_documents.new(client_document_params)
  
        if @client_document.save
          # Extract the base64-encoded data from the params
          encoded_document = params[:client_document][:base64]
  
          # Pass the base64-encoded data to the upload_to_s3 method
          if @client_document.upload_to_s3(encoded_document)
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
        # Ensure that 'base64' is not included in the permitted parameters
        params.require(:client_document).permit(:document_type, :tax_year, :file_name)
      end
  
      def set_client
        @client = Client.find(params[:client_id])
      end
    end
end
  
  