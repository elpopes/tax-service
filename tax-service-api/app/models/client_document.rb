require 'aws-sdk-lambda'

class ClientDocument < ApplicationRecord
  belongs_to :client
  has_one_attached :document

  enum document_type: { id_card: 0, w2: 1, expenses: 2, ss_card: 3, stock_earnings_1099b: 4, crypto_earnings: 5, other: 6 }
  enum status: { uploaded: 0, processed: 1, failed: 2 }

  def upload_to_s3(encoded_document)
    document_key = "#{SecureRandom.uuid}-#{file_name}"
    payload = { documentData: encoded_document, documentKey: document_key }.to_json

    response = invoke_lambda('TaxServiceLambda-putItemFunction-TIiOEHgUxZjz', payload)
    
    lambda_response = process_lambda_response(response)
    if lambda_response[:success]
      update(file_path: document_key)
      true
    else
      Rails.logger.error("Upload to S3 failed: #{lambda_response[:error]}")
      false
    end
  end

  def get_document_by_id
    payload = { documentKey: file_path }.to_json
    response = invoke_lambda('TaxServiceLambda-getItemFunction-GmOvZ5AvvDRQ', payload)

    process_lambda_response(response) do
      # Handle the retrieved document 
    end
  end

  def delete_document
    payload = { documentKey: file_path }.to_json
    response = invoke_lambda('TaxServiceLambda-deleteItemFunction-Ruqf1mn50ZK9', payload)

    process_lambda_response(response)
  end

  private

  def setup_lambda_client
    Aws::Lambda::Client.new(
      region: 'us-east-1',
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )
  end

  def invoke_lambda(function_name, payload)
    lambda_client = setup_lambda_client
    Rails.logger.info("Invoking Lambda function: #{function_name} with payload: #{payload}")

    lambda_client.invoke({
      function_name: function_name,
      invocation_type: 'RequestResponse',
      payload: payload
    })
  rescue Aws::Lambda::Errors::ServiceError => e
    Rails.logger.error("AWS Lambda Service Error: #{e.message}")
    nil
  rescue => e
    Rails.logger.error("Exception in Lambda invocation: #{e.message}")
    nil
  end

  def process_lambda_response(response)
    if response&.status_code == 200
      yield if block_given?
      { success: true }
    else
      error_details = {
        status: response&.status_code,
        payload: response&.payload&.read,
        complete_response: response&.to_h
      }
      log_lambda_error(error_details)
      { success: false, error: error_details }
    end
  end

  def log_lambda_error(error_details)
    Rails.logger.error("Error interacting with Lambda. Response status: #{error_details[:status]}")
    Rails.logger.error("Response payload: #{error_details[:payload]}")
    Rails.logger.error("Complete response: #{error_details[:complete_response]}")
  end
end
