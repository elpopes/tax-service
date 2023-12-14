module Api
    class ClientDocumentsController < ApplicationController
      before_action :authenticate_user
      before_action :set_client
      before_action :set_client_document, only: [:show, :destroy]
  
      def create
        @client_document = @client.client_documents.new(client_document_params)
  
        if @client_document.save
          encoded_document = params[:client_document][:base64]
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
  
      def show
        if @client_document.get_document_by_id
          # Send doc back to frontside
        else
          render json: { message: "Failed to retrieve document" }, status: :not_found
        end
      end
  
      def destroy
        if @client_document.delete_document
          @client_document.destroy
          render json: { message: "Document deleted successfully" }, status: :ok
        else
          render json: { message: "Failed to delete document" }, status: :unprocessable_entity
        end
      end
  
      private
  
      def client_document_params
        params.require(:client_document).permit(:document_type, :tax_year, :file_name)
      end
  
      def set_client
        @client = Client.find(params[:client_id])
      end
  
      def set_client_document
        @client_document = @client.client_documents.find(params[:id])
      end
    end
end
  
  