# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  def index
    @quizzes = Quiz.all
    render status: :ok, json: { quizzes: @quizzes }
  end

  def create
    @quiz = Quiz.new(quiz_params)
    if @quiz.save
      render status: :ok,
        json: { notice: t("quiz.successfully_created") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :user_id)
    end
end
