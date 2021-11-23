# frozen_string_literal: true

class Public::AttemptAnswersController < ApplicationController
  before_action :load_attempt

  def create
    if @attempt.present?
      correct = 0
      questions = @attempt.quiz.questions.map do |q|
        { id: q.id, answer: q.options.find { |o| o.is_answer }.id }
      end
      attempt_answer_params[:list].each do |answer|
        attempted_answer = @attempt.attempt_answers.new(answer)
        attempted_answer.save
        correct += 1 if questions.find { |q|
 q[:id].to_i == answer["question_id"].to_i }[:answer].to_i == answer["answer"].to_i
      end
      @attempt.update(
        {
          submitted: true, correct_answers_count: correct,
          incorrect_answers_count: questions.size - correct
        })
      render status: :ok, json: { notice: t("successfully_submitted", entity: "Quiz") }
    else
      render status: :unprocessable_entity, json: { errors: @attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def load_attempt
      @attempt = Attempt.find(attempt_answer_params[:attempt_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end

    def attempt_answer_params
      params.require(:answers).permit(:attempt_id, list: [:answer, :question_id])
    end
end
