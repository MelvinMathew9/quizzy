# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::ReportsController, type: :request do
  let(:user) { create(:user, role: :administrator) }
  let(:auth_headers) { { "X-Auth-Token" => user.authentication_token, "X-Auth-Email" => user.email } }

  describe "GET /api/v1/reports" do
    it "lists reports for current user" do
      get api_v1_reports_path, headers: auth_headers
      expect(response).to have_http_status(:success)
    end
  end
end
