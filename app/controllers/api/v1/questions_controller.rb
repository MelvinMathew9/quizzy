# frozen_string_literal: true

class Api::V1::QuestionsController < ApplicationController
  include Authenticatable

  before_action :load_quiz, only: %i[create update]
  before_action :load_question, only: %i[destroy show update]
  before_action :authorize_quiz

  after_action :verify_authorized

  def create
    question = @quiz.questions.new(question_params)

    respond_with_save(question, :created)
  end

  def show; end

  def update
    @question.assign_attributes(question_params)

    respond_with_save(@question, :updated)
  end

  def destroy
    if @question.destroy
      respond_with_success(t("successfully_deleted", entity: "Question"))
    else
      respond_with_error(@question.errors.full_messages.to_sentence)
    end
  end

  private

    def authorize_quiz
      authorize @quiz || @question.quiz
    end

    def question_params
      params.require(:questions).permit(
        :question,
        :quiz_id,
        options_attributes: [:id, :content, :is_answer, :_destroy]
      )
    end

    def load_quiz
      @quiz = Quiz.find(question_params[:quiz_id])
    end

    def load_question
      @question = Question.find(params[:id])
    end
end
