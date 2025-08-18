# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::QuizzesController, type: :request do
  let(:user) { create(:user, role: :administrator) }
  let(:auth_headers) { { "X-Auth-Token" => user.authentication_token, "X-Auth-Email" => user.email } }
  let!(:quiz) { create(:quiz, user: user) }

  describe "POST /api/v1/quizzes" do
    it "creates a valid quiz" do
      post api_v1_quizzes_path, params: { quiz: { title: "New Quiz", user_id: user.id } }, headers: auth_headers
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /api/v1/quizzes/:id" do
    it "shows the quiz for creator" do
      get api_v1_quiz_path(quiz), headers: auth_headers
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT /api/v1/quizzes/:id" do
    it "updates quiz fields for creator" do
      put api_v1_quiz_path(quiz), params: { quiz: { title: "Updated Quiz" } }, headers: auth_headers
      expect(response).to have_http_status(:success)
      expect(quiz.reload.title).to eq("Updated Quiz")
    end
  end

  describe "DELETE /api/v1/quizzes/:id" do
    it "destroys the quiz for creator" do
      expect { delete api_v1_quiz_path(quiz), headers: auth_headers }
        .to change(Quiz, :count).by(-1)
      expect(response).to have_http_status(:success)
    end
  end
end
