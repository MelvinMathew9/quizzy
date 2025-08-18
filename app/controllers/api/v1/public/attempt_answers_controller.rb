# frozen_string_literal: true

class Api::V1::Public::AttemptAnswersController < ApplicationController
  before_action :load_attempt

  def create
    service.process

    if service.success?
      respond_with_success(t("successfully_submitted", entity: "Quiz"))
    else
      respond_with_error(service.errors)
    end
  end

  private

    def service
      @service ||= QuizSubmissionService.new(@attempt, answer_params[:list])
    end

    def load_attempt
      @attempt = Attempt.find(answer_params[:attempt_id])
    end

    def answer_params
      params.require(:answers).permit(:attempt_id, list: [:answer, :question_id])
    end
end
