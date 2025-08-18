# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      defaults format: :json do
        resources :quizzes, except: [:edit] do
          post :publish, on: :member
        end
        resources :questions, except: [:edit, :index]
        resources :reports, only: [:index] do
          collection do
            get :export
            get :export_status
            get :export_download
          end
        end

        namespace :public do
          resources :quizzes, only: [:show], param: :slug do
            get :slug_verify, on: :member
          end
          resources :questions, only: [:show], param: :slug
          resources :attempts, only: [:create, :show]
          resources :attempt_answers, only: [:create]
          resources :users, only: [:create]
        end
      end
    end
  end

  defaults format: :json do
    resource :session, only: [:create, :destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
