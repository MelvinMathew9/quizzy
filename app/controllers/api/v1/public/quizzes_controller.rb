# frozen_string_literal: true

class Api::V1::Public::QuizzesController < ApplicationController
  before_action :load_quiz

  def show
    render json: { quiz: { id: @quiz.id, title: @quiz.title } }, status: :ok
  end

  def slug_verify
    render json: { slug: "verified" }, status: :ok
  end

  private

    def load_quiz
      @quiz = Quiz.find_by_slug!(params[:slug])
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end
end
