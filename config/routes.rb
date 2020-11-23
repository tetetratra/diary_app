Rails.application.routes.draw do
  resources :notes, only: [:show, :index, :update]
  resources :users, only: [:new, :create]
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  get '/csv_download', to: 'notes#csv_download', as: 'csv_download'
  root to: redirect('/index.html')
end
