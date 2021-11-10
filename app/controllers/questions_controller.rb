# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_quiz, only: %i[create update]
  before_action :load_question, only: :update

  def create
    question = @quiz.questions.new({ question: question_params[:question], quiz_id: question_params[:quiz_id] })
    if question.save!
      question_params[:list].each do |option|
        option = question.options.new(option.merge(question_id: question.id))
        option.save
      end
      render status: :ok, json: { notice: t("question.successfully_created") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def update
    @question.options.destroy_all
    if @question.update({ question: question_params[:question] })
      question_params[:list].each do |option|
        option = @question.options.new(option.merge(question_id: @question.id))
        option.save
      end
      render status: :ok, json: { notice: t("question.successfully_updated") }
    else
      render status: :unprocessable_entity,
        json: { errors: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:questions).permit(:question, :quiz_id, list: [:content, :is_answer])
    end

    def load_quiz
      @quiz = Quiz.find(question_params[:quiz_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end

    def load_question
      @question = Question.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end
end
