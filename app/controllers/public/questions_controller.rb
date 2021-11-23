# frozen_string_literal: true

class Public::QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: :show

  def show
    @questions = @quiz.questions.map do
       |q| { id: q.id, question: q.question, options: q.options.map { |o| { id: o.id, content: o.content } } }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by_slug!(params[:slug])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end
end
