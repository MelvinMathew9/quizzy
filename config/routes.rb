# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: %i[create index show update destroy]
    resources :questions, only: %i[create update destroy]
    resources :reports, only: %i[index]

    namespace :public do
      resources :quizzes, only: %i[show], param: :slug
      resources :questions, only: %i[show], param: :slug
      resources :attempts, only: %i[create show]
      resources :attempt_answers, only: %i[create]
      resources :users, only: %i[create]
    end

  end

  root "home#index"
  get "/export" => "reports#export"
  get "/export_status" => "reports#export_status"
  get "*path", to: "home#index", via: :all
end
