# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: %i[create index show update destroy], param: :slug
    resources :questions, only: %i[create update destroy]

  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
