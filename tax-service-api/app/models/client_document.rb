require 'aws-sdk-lambda'

class ClientDocument < ApplicationRecord
  belongs_to :client
  has_one_attached :document

  enum document_type: { id: 0, w2: 1, expenses: 2, ss_card: 3, stock_earnings_1099b: 4, crypto_earnings: 5, other: 6 }
  enum status: { uploaded: 0, processed: 1, failed: 2 }

  def upload_to_s3(encoded_document)
    # Generate a unique key for the document
    document_key = "#{SecureRandom.uuid}-#{file_name}"

    # Setup AWS Lambda client
    lambda_client = Aws::Lambda::Client.new(
      region: 'us-east-1',
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )

    # Prepare the payload for Lambda invocation
    payload = {
      documentData: encoded_document,
      documentKey: document_key
    }.to_json

    Rails.logger.info("Sending payload to Lambda: #{payload}")
    # Invoke the Lambda function
    response = lambda_client.invoke({
      function_name: 'TaxServiceLambda-putItemFunction-TIiOEHgUxZjz',
      invocation_type: 'RequestResponse',
      payload: payload
    })

    # Interpret the response
    if response.status_code == 200
        update(file_path: document_key)
        true
    else
        # Log detailed information when an error occurs
        log_lambda_error(response)
        false
    end
    rescue Aws::Lambda::Errors::ServiceError => e
      Rails.logger.error("AWS Lambda Service Error: #{e.message}")
      false
    rescue => e
      Rails.logger.error("Exception in upload_to_s3: #{e.message}")
      false
    end
  
    private
  
    def log_lambda_error(response)
      Rails.logger.error("Error uploading document to S3. Response status: #{response.status_code}")
      Rails.logger.error("Response payload: #{response.payload.read}")
      Rails.logger.error("Complete response: #{response.to_h}")
    end
end

