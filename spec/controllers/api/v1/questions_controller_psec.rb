# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::QuestionsController, type: :request do
  let(:user) { create(:user, role: :administrator) }
  let(:auth_headers) { { "X-Auth-Token" => user.authentication_token, "X-Auth-Email" => user.email } }
  let(:quiz) { create(:quiz, user: user) }
  let!(:question) { create(:question, quiz: quiz) }

  describe "POST /api/v1/questions" do
    it "creates a valid question" do
      post api_v1_questions_path, params: {
        questions: {
          question: question.question,
          quiz_id: quiz.id,
          options_attributes: [
            { content: "2", is_answer: true },
            { content: "3", is_answer: false }
          ]
        }
      }, headers: auth_headers
      expect(response).to have_http_status(:success)
      expect(response.parsed_body["notice"]).to eq(I18n.t("successfully_created", entity: "Question"))
    end
  end

  describe "GET /api/v1/questions/:id" do
    it "shows the quiz for creator" do
      get api_v1_question_path(question), headers: auth_headers
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT /api/v1/questions/:id" do
    it "updates any quiz fields for creator" do
      new_title = "#{quiz.title}test"
      put api_v1_question_path(question), params: {
        questions: {
          question: new_title,
          quiz_id: quiz.id,
          options_attributes: [
            { content: "3", is_answer: false },
            { content: "4", is_answer: false }
          ]
        }
      }, headers: auth_headers
      expect(response).to have_http_status(:success)
      expect(question.reload.question).to eq(new_title)
    end
  end

  describe "DELETE /api/v1/questions/:id" do
    it "destroys the quiz for creator" do
      expect { delete api_v1_question_path(question), headers: auth_headers }
        .to change(Question, :count).by(-1)
      expect(response).to have_http_status(:success)
    end
  end
end
