Rails.application.routes.draw do
    root to: "home#index"
    get 'home/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    devise_for :users
    post '/sessions', to: 'sessions#create'
    delete '/sessions/:id', to: 'sessions#revoke'
    delete '/sessions', to: 'sessions#revoke_all'
    post '/refresh', to: 'sessions#refresh'
    resources :users, only: [:index, :show, :create, :update, :destroy]
  end
end
