# frozen_string_literal: true

class Public::UsersController < ApplicationController
  before_action :load_user, only: :create

  def create
    unless @user
      @user = User.new(
        user_params.merge({ password: "welcome", password_confirmation: "welcome" }))
      unless @user.save
        errors = @user.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { errors: errors }
      end
    end
    render status: :ok, json: { user: @user }
  end

  private

    def load_user
      @user = User.find_by_email(user_params[:email])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
