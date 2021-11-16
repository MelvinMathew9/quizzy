# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: :show
  before_action :load_attempt, only: :show

  def create
    @attempt = Attempt.find_by({ quiz_id: attempt_params[:quiz_id], user_id: attempt_params[:user_id] })
    unless @attempt.present?
      @attempt = Attempt.new(attempt_params)
      if !@attempt.save
        errors = @attempt.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
    render status: :ok, json: { attempt: @attempt }
  end

  def show
    if @attempt.submitted
      submitted_answers = AttemptAnswer.where({ attempt_id: @attempt.id })
      answers = @quiz.questions.map { |q| {
        id: q.id, question: q.question, options: q.options, submitted_answer: submitted_answers.find { |answer|
answer.question_id == q.id }.answer
      } }
      render status: :ok, json: { answers: answers }
    else
      render status: :ok, json: { notice: t("quiz.not_submitted") }
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(:quiz_id, :user_id)
    end

    def load_attempt
      @attempt = Attempt.find(params[:id])
      @quiz = Quiz.find(@attempt.quiz_id)
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end
end
