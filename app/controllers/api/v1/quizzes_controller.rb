# frozen_string_literal: true

class Api::V1::QuizzesController < ApplicationController
  include Authenticatable

  before_action :load_quiz, only: %i[show update destroy publish]
  before_action :authorize_quiz, except: %i[index create]
  after_action :verify_authorized, except: :index

  def index
    quizzes = @current_user.quizzes.recent
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    authorize quiz

    respond_with_save(quiz, :created)
  end

  def show
    @questions = @quiz.serialized_questions
  end

  def update
    @quiz.assign_attributes(quiz_params)

    respond_with_save(@quiz, :updated)
  end

  def publish
    @quiz.set_slug!

    respond_with_save(@quiz, :published)
  end

  def destroy
    if @quiz.destroy
      respond_with_success(t("successfully_deleted", entity: "Quiz"))
    else
      respond_with_error(@quiz.errors.full_messages.to_sentence)
    end
  end

  private

    def authorize_quiz
      authorize @quiz
    end

    def quiz_params
      params.require(:quiz).permit(:title)
    end

    def load_quiz
      @quiz = Quiz.find(params[:id])
    end
end
