require 'rails_helper'
require_relative '../../app/controllers/api/clients_controller'

RSpec.describe Api::ClientsController, type: :controller do
  let(:user) { create(:user, :with_client) }

  before do
    allow_any_instance_of(ApplicationController).to receive(:authenticate_user).and_return(true)
    token = ApplicationController.new.encode_token({ user_id: user.id }) 
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
      it 'returns an error' do
        put :update, params: { id: user.client.id, client: { first_name: '' }, user: { email: '' } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['errors']).to include("First name can't be blank") 
      end
    end

    # Additional test to check if the token is correctly passed
    it 'has a valid token in the Authorization header' do
      expect(request.headers['Authorization']).to eq("Bearer #{encode_token({ user_id: user.id })}")
    end
  end
end
