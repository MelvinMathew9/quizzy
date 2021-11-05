# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.all
    render status: :ok, json: { quizzes: @quizzes }
  end

  def create
    @quiz = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    if @quiz.save
      render status: :ok,
        json: { notice: t("quiz.successfully_created") }
    else
      errors = @task.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

    def quiz_params
      params.require(:task).permit(:title)
    end
end
