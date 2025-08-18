# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Public::QuizzesController, type: :request do
  let!(:quiz) { create(:quiz, slug: "test-slug") }

  describe "GET /api/v1/public/quizzes/:slug" do
    it "shows quiz by slug" do
      get api_v1_public_quiz_path(quiz.slug)
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["quiz"]["id"]).to eq(quiz.id)
    end
  end

  describe "GET /api/v1/public/quizzes/:slug/verify" do
    it "verifies quiz slug" do
      get slug_verify_api_v1_public_quiz_path(quiz.slug)
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["slug"]).to eq("verified")
    end
  end
end
