require 'rails_helper'

RSpec.describe ClientsController, type: :controller do
  let(:user) { FactoryBot.create(:user, :with_client) }

  before do
    sign_in user
  end

  def json_response
    JSON.parse(response.body)
  end

  describe 'PUT #update' do
    context 'when the update is successful' do
      it 'updates the client and user attributes' do
        put :update, params: { client: { first_name: 'NewName' }, user: { email: 'new_email@example.com' } }

        expect(response).to have_http_status(:ok)
        expect(json_response['first_name']).to eq('NewName')
        expect(user.reload.client.first_name).to eq('NewName') 
      end
    end

    context 'when the update fails' do
      it 'returns an error' do
        put :update, params: { client: { first_name: '' }, user: { email: '' } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['errors']).to include("First name can't be blank") 
      end
    end
  end
end
