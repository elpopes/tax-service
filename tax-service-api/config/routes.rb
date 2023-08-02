Rails.application.routes.draw do
    root to: "home#index"
    get 'home/index'
    
    namespace :api do
      # Registrations, sessions and password management
      devise_for :users, controllers: { registrations: 'api/registrations' }
  
      # Login and logout routes
      post '/sessions', to: 'sessions#create'
      delete '/sessions/:id', to: 'sessions#revoke'
      delete '/sessions', to: 'sessions#destroy'
      post '/refresh', to: 'sessions#refresh'
  
      # User management (excluding creation)
      resources :users, only: [:index, :show, :update, :destroy]
    end
  end
  