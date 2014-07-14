Rails.application.routes.draw do

  root 'camp#index'
  resources :camp, only: [:index]
  resources :users
  resources :campsites

  # resources :sessions, :only => [:destroy, :create, :new]
  get '/logout' => 'sessions#destroy', as: 'logout'
  get '/login' => 'sessions#new', as: 'login'
  post '/login' => 'sessions#create'

  get '/about' => 'camp#about', as: 'about'

end
