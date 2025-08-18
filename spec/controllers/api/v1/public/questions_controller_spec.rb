# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Public::QuestionsController, type: :request do
  let!(:quiz) { create(:quiz, slug: "test-slug") }
  let!(:question) { create(:question, quiz: quiz) }

  describe "GET /api/v1/public/quizzes/:slug/questions" do
    it "shows questions for quiz by slug" do
      get "/api/v1/public/quizzes/#{quiz.slug}/questions"
      expect(response).to have_http_status(:success)
      expect(response.parsed_body).to be_present
    end
  end
end
