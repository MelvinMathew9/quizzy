# frozen_string_literal: true

class Public::AttemptAnswersController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def create
    correct = 0
    total = 0
    attempt = Attempt.find(attempt_answer_params[:attempt_id])
    questions = Quiz.find(attempt.quiz_id).questions.map do |q|
      total += 1
      { id: q.id, answer: q.options.find { |o| o.is_answer }.id }
    end
    attempt_answer_params[:list].each do |a|
      attempted_answer = AttemptAnswer.new(a.merge(attempt_id: attempt_answer_params[:attempt_id]))
      attempted_answer.save
      correct += 1 if questions.find { |q| q[:id].to_i == a["question_id"].to_i }[:answer].to_i == a["answer"].to_i
    end
    if attempt.present?
      attempt.update({ submitted: true, correct_answers_count: correct, incorrect_answers_count: total - correct })
      render status: :ok, json: { notice: t("successfully_submitted", entity: "Quiz") }
    else
      render status: :unprocessable_entity, json: { errors: attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def attempt_answer_params
      params.require(:answers).permit(:attempt_id, list: [:answer, :question_id])
    end
end
