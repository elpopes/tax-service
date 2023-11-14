Rails.application.routes.draw do
    root to: "home#index"
    get 'home/index'
  
    namespace :api do
      # Devise routes for user sessions and confirmations
      devise_for :users, skip: [:registrations], controllers: { 
        sessions: 'api/sessions',
        confirmations: 'api/confirmations'
      }
  
      # Custom routes for sessions management
      post '/sessions', to: 'sessions#create'
      delete '/sessions/:id', to: 'sessions#revoke'
      delete '/sessions', to: 'sessions#destroy'
      post '/refresh', to: 'sessions#refresh'
  
      # Routes for user management
      resources :users, only: [:index, :show, :create, :update, :destroy]
  
      # Routes for client management
      resources :clients, only: [] do
        collection do
          get :profile  # GET /api/clients/profile
        end
  
        member do
          patch :update  # PATCH /api/clients/:id
          post :create_spouse  # POST /api/clients/:id/create_spouse
          patch :update_spouse  # PATCH /api/clients/:id/update_spouse
          delete :destroy_spouse  # DELETE /api/clients/:id/destroy_spouse
  
          post :create_dependent  # POST /api/clients/:id/create_dependent
          patch :update_dependent  # PATCH /api/clients/:id/update_dependent
          delete :destroy_dependent  # DELETE /api/clients/:id/destroy_dependent
        end
      end
  
      # Route for public keys
      get '/keys/public', to: 'keys#public_key'
    end
  end
  
