# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  before_action :load_quiz, only: %i[show]

  def show
    render json: { quiz: { title: @quiz.title } }, status: :ok
  end

  private

    def quiz_params
      params.require(:quiz).permit(:mode)
    end

    def load_quiz
      @quiz = Quiz.find_by_slug!(params[:slug])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end
end
