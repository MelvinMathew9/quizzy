# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[create update]
  before_action :load_question, only: %i[destroy update]

  def create
    question = @quiz.questions.new({ question: question_params[:question], quiz_id: question_params[:quiz_id] })
    if question.save!
      question_params[:list].each do |option|
        option = question.options.new(option.merge(question_id: question.id))
        option.save
      end
      render status: :ok, json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    @question.options.destroy_all
    if @question.update({ question: question_params[:question] })
      question_params[:list].each do |option|
        option = @question.options.new(option.merge(question_id: @question.id))
        option.save
      end
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
      params.require(:questions).permit(:question, :quiz_id, list: [:content, :is_answer])
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
