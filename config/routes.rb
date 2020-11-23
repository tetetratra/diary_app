Rails.application.routes.draw do
  resources :notes, only: [:show, :index]
  patch '/notes', to: 'notes#update'
  resources :users, only: [:new, :create]
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  get '/csv_download', to: 'notes#csv_download', as: 'csv_download'
  root to: redirect('/index.html')
  get '/sample_login', to: 'sessions#sample_new'
end
