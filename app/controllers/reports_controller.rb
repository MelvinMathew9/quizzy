# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  def index
    quiz_ids = @current_user.quizzes.map { |quiz| quiz.id }
    @attempts = Attempt.where(submitted: true, quiz_id: quiz_ids).joins(
      :user,
      :quiz).select("attempts.*, quizzes.title, users.first_name, users.last_name, users.email")
  end
end
