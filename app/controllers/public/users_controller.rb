# frozen_string_literal: true

class Public::UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email])
    if @user.present?
      render status: :ok,
        json: { notice: t("already_registered", entity: "User"), user: @user }
    else
      @user = User.new(user_params.merge({ password: "welcome", password_confirmation: "welcome" }))
      if @user.save
        render status: :ok,
          json: { notice: t("successfully_registered", entity: "User"), user: @user }
      else
        errors = @user.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
