# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[show update destroy]

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

  def show
    render status: :ok, json: { quiz: @quiz }
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.successfully_updated") }
    else
      render status: :unprocessable_entity,
        json: { errors: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: t("quiz.successfully_deleted") }
    else
      render status: :unprocessable_entity,
        json: { errors: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :user_id)
    end

    def load_quiz
      @quiz = Quiz.find_by_slug!(params[:slug])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end
end
