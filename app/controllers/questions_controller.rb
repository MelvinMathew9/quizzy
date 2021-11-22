# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[create update]
  before_action :load_question, only: %i[destroy show update]

  def create
    question = Question.new(question_params)
    if question.save!
      render status: :ok, json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    render status: :ok, json: { question: { question: @question.question, options: @question.options } }
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Question") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Question") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:questions).permit(:question, :quiz_id, options_attributes: [:id, :content, :is_answer, :_destroy])
    end

    def load_quiz
      @quiz = Quiz.find(question_params[:quiz_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end

    def load_question
      @question = Question.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end
end
