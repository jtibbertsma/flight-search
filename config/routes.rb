Rails.application.routes.draw do
  root to: "pages#root"
  post '/api/search', to: 'flights#search'
end
