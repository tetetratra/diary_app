Rails.application.routes.draw do
  resources :notes, only: [:index, :update]
  resources :users, only: [:new, :create]
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  root to: redirect('/index.html')
end
