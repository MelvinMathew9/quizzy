# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[show update destroy]

  def index
    @quizzes = policy_scope(Quiz)
    render status: :ok, json: { quizzes: @quizzes }
   end

  def create
    quiz = Quiz.new(quiz_params)
    authorize quiz
    if quiz.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Quiz") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    authorize @quiz
    @questions = @quiz.questions.map { |q| { id: q.id, question: q.question, options: q.options } }
  end

  def update
    authorize @quiz
    if params[:publish]
      slug = Quiz.set_slug(@quiz.title)
      if @quiz.update(slug: slug)
        render status: :ok, json: { notice: t("successfully_published", entity: "Quiz") }
      else
        render status: :unprocessable_entity,
          json: { error: @quiz.errors.full_messages.to_sentence }
      end
    else
      if @quiz.update(quiz_params)
        render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
      else
        render status: :unprocessable_entity,
          json: { error: @quiz.errors.full_messages.to_sentence }
      end
    end
  end

  def destroy
    authorize @quiz

    if @quiz.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Quiz") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :user_id)
    end

    def load_quiz
      @quiz = Quiz.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end
end
