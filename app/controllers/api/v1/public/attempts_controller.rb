# frozen_string_literal: true

class Api::V1::Public::AttemptsController < ApplicationController
  before_action :load_attempt, only: :show

  def create
    attempt = Attempt.find_by({ quiz_id: attempt_params[:quiz_id], user_id: attempt_params[:user_id] })
    unless attempt.present?
      attempt = Attempt.new(attempt_params)
      if !attempt.save
        errors = attempt.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
    render status: :ok, json: { attempt: attempt }
  end

  def show
    if @attempt.submitted
      submitted_answers = @attempt.attempt_answers
      answers = @attempt.quiz.questions.map do |question| {
        id: question.id, question: question.question, options: question.options,
        submitted_answer: submitted_answers.find do |answer|
answer.question_id == question.id end ? submitted_answers.find { |answer| answer.question_id == question.id }.answer : 0
      } end
      render status: :ok, json: { answers: answers, attempt: @attempt }
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
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end
end
