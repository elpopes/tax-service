Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    post '/sessions', to: 'sessions#create'
    delete '/sessions/:id', to: 'sessions#revoke'
    delete '/sessions', to: 'sessions#revoke_all'
    post '/refresh', to: 'sessions#refresh'
    resources :users, only: [:index, :show, :create, :update, :destroy]
  end
end
