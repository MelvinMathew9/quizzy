# frozen_string_literal: true

class Api::V1::Public::AttemptsController < ApplicationController
  before_action :load_attempt, only: :show

  def create
    attempt = Attempt.find_by(quiz_id: attempt_params[:quiz_id], user_id: attempt_params[:user_id])
    unless attempt
      attempt = Attempt.new(attempt_params)

      respond_with_error(attempt.errors.full_messages.to_sentence) if !attempt.save
    end
    render status: :ok, json: { attempt: attempt }
  end

  def show
    if @attempt.submitted
      render status: :ok, json: { answers: serialized_answers(@attempt), attempt: @attempt }
    else
      render status: :ok, json: { attempt: @attempt }
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(:quiz_id, :user_id)
    end

    def load_attempt
      @attempt = Attempt.find(params[:id])
    end

    def serialized_answers(attempt)
      submitted_answers = attempt.attempt_answers.index_by(&:question_id)
      attempt.quiz.questions.map do |question|
        question.as_json.merge(
          { submitted_answer: submitted_answers[question.id]&.answer || 0 }
        )
      end
    end
end
