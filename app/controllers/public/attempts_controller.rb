# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  def create
    @attempt = Attempt.new(attempt_params)
    if @attempt.save
      render status: :ok,
        json: { notice: t("successfully_registered", entity: "User"), attempt: @attempt }
    else
      attempt = @attempt.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(:quiz_id, :user_id)
    end
end
