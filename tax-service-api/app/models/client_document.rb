class ClientDocument < ApplicationRecord
    belongs_to :client
  
    enum document_type: { id: 0, w2: 1, expenses: 2, ss_card: 3, stock_earnings_1099b: 4, crypto_earnings: 5, other: 6 }
    enum status: { uploaded: 0, processed: 1, failed: 2 }
  
    # Add validations and methods
  end
  
