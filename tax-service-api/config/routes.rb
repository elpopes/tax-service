Rails.application.routes.draw do
    root to: "home#index"
    get 'home/index'
    
    namespace :api do
      # Skip registrations but keep other Devise functionalities intact
      devise_for :users, skip: [:registrations], controllers: { 
        sessions: 'api/sessions',
        confirmations: 'api/confirmations'
      }
  
      # Custom route for login and logout
      post '/sessions', to: 'sessions#create'
      delete '/sessions/:id', to: 'sessions#revoke'
      delete '/sessions', to: 'sessions#destroy'
      post '/refresh', to: 'sessions#refresh'
  
      # Custom route for user management
      resources :users, only: [:index, :show, :create, :update, :destroy]
      
      resources :clients, only: [:update] do
        collection do
          get :profile  # Moved the profile route here
        end
      end
    end
end
