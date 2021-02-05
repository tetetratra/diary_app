Rails.application.routes.draw do
  post '/notes', to: 'notes#update'
  get '/notes', to: 'notes#index'

  resources :users, only: [:new, :create]
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  root to: redirect('/index.html')
  get '/sample_login', to: 'sessions#sample_new'
end
