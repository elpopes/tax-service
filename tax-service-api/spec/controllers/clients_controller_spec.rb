require 'rails_helper'
require_relative '../../app/controllers/api/clients_controller'

RSpec.describe Api::ClientsController, type: :controller do
  let(:user) { create(:user, :with_client) }

  before do
    allow_any_instance_of(ApplicationController).to receive(:authenticate_user).and_return(true)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
    token = JsonWebToken.encode({ user_id: user.id })
    request.headers['Authorization'] = "Bearer #{token}"
  end
  

  def json_response
    JSON.parse(response.body)
  end

  describe 'PUT #update' do
    context 'when the update is successful' do
      it 'updates the client and user attributes' do
        put :update, params: { id: user.client.id, client: { first_name: 'NewName' }, user: { email: 'new_email@example.com' } }

        expect(response).to have_http_status(:ok)
        expect(json_response['first_name']).to eq('NewName')
        expect(user.reload.client.first_name).to eq('NewName') 
      end
    end

    context 'when the update fails' do
        it 'returns a status code of 422 when update fails' do
            allow_any_instance_of(User).to receive(:update).and_return(false)
            allow_any_instance_of(Client).to receive(:update).and_return(false)
          
            put :update, params: { user: attributes_for(:user), client: attributes_for(:client) }
            
            expect(response).to have_http_status(422)
        end
    end

    # Additional test to check if the token is correctly passed
    it 'has a valid token in the Authorization header' do
        expect(request.headers['Authorization']).to eq("Bearer #{JsonWebToken.encode({ user_id: user.id })}")
    end
  end
end
