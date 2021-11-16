# frozen_string_literal: true

class Public::AttemptAnswersController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def create
    attempt_answer_params[:list].each do |answer|
      answer = AttemptAnswer.new(answer.merge(attempt_id: attempt_answer_params[:attempt_id]))
      answer.save
    end
    @attempt = Attempt.find(attempt_answer_params[:attempt_id])
    if @attempt.present?
      @attempt.update({ submitted: true })
      render status: :ok, json: { notice: t("successfully_submitted", entity: "Quiz") }
    else
      render status: :unprocessable_entity, json: { errors: @attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def attempt_answer_params
      params.require(:answers).permit(:attempt_id, list: [:answer, :question_id])
    end
end
