# frozen_string_literal: true

class Api::V1::Public::QuestionsController < ApplicationController
  before_action :load_quiz

  def show
    @questions = @quiz.questions.map(&:as_json)
  end

  private

    def load_quiz
      @quiz = Quiz.find_by_slug!(params[:slug])
    end
end
