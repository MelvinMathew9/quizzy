# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Public::AttemptsController, type: :request do
  let!(:quiz) { create(:quiz) }
  let!(:user) { create(:user) }
  let!(:attempt) { create(:attempt, quiz: quiz, user: user) }

  describe "POST /api/v1/public/attempts" do
    it "creates an attempt" do
      post api_v1_public_attempts_path, params: { attempt: { quiz_id: quiz.id, user_id: user.id } }
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["attempt"]).to be_present
    end
  end

  describe "GET /api/v1/public/attempts/:id" do
    it "shows an attempt" do
      get api_v1_public_attempt_path(attempt)
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["attempt"]).to be_present
    end
  end
end
