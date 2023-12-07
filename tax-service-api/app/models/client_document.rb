require 'aws-sdk-lambda'

class ClientDocument < ApplicationRecord
    belongs_to :client
  
    enum document_type: { id: 0, w2: 1, expenses: 2, ss_card: 3, stock_earnings_1099b: 4, crypto_earnings: 5, other: 6 }
    enum status: { uploaded: 0, processed: 1, failed: 2 }

    def upload_to_s3(document)
    # Encode the document in Base64
    encoded_document = Base64.encode64(document.read)

    # Generate a unique key for the document
    document_key = "#{SecureRandom.uuid}-#{file_name}"

    # Setup AWS Lambda client
    lambda_client = Aws::Lambda::Client.new(region: 'us-east-1')

    # Prepare the payload for Lambda invocation
    payload = {
        documentData: encoded_document,
        documentKey: document_key
    }.to_json

    # Invoke the Lambda function
    response = lambda_client.invoke({
        function_name: 'TaxServiceLambda-putItemFunction-TIiOEHgUxZjz',
        invocation_type: 'RequestResponse',
        payload: payload
    })

    # Interpret the response
    if response.status_code == 200
        # Update the file_path with the S3 object key
        update(file_path: document_key)
        true
    else
        Rails.logger.error("Error uploading document to S3: #{response.error}")
        false
    end
    rescue Aws::Lambda::Errors::ServiceError => e
    # Log any AWS Lambda errors
    Rails.logger.error("AWS Lambda Service Error: #{e.message}")
    false
    rescue => e
    # Log any other errors
    Rails.logger.error("Exception in upload_to_s3: #{e.message}")
    false
    end

end
  
