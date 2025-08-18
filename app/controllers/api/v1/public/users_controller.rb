# frozen_string_literal: true

class Api::V1::Public::UsersController < ApplicationController
  before_action :load_user, only: :create

  def create
    @user = @user || build_user_with_defaults
    if @user.persisted? || @user.save
      render status: :ok, json: { user: @user }
    else
      respond_with_error(@user.errors.full_messages.to_sentence)
    end
  end

  private

    def build_user_with_defaults
      user = User.new(user_params)
      user.set_default_password
      user
    end

    def load_user
      @user = User.find_by_email(user_params[:email])
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
