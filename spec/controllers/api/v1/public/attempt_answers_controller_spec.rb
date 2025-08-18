# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Public::AttemptAnswersController, type: :request do
  let!(:attempt) { create(:attempt) }

  describe "POST /api/v1/public/attempt_answers" do
    it "submits answers for an attempt" do
      question = create(:question)
      post api_v1_public_attempt_answers_path, params: {
        answers: {
          attempt_id: attempt.id,
          list: [ { answer: 1, question_id: question.id } ]
        }
      }
      expect(response).to have_http_status(:success)
      expect(response.parsed_body["notice"]).to eq(I18n.t("successfully_submitted", entity: "Quiz"))
    end
  end
end
