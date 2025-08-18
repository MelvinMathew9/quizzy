# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Public::UsersController, type: :request do
  let(:user) { create(:user, role: :administrator) }
  let(:auth_headers) { { "X-Auth-Token" => user.authentication_token, "X-Auth-Email" => user.email } }

  describe "POST /api/v1/public/users" do
    it "creates a valid user" do
      post api_v1_public_users_path, params: { user: attributes_for(:user) }

      expect(response).to have_http_status(:success)
      expect(response.parsed_body["user"]).to include("email")
    end

    it "returns error for missing params" do
      post api_v1_public_users_path, params: { user: { first_name: "", last_name: "", email: "" } }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.parsed_body["error"]).to be_present
    end

    it "returns existing user if email already exists" do
      existing_user = create(:user, email: "test@example.com")
      post api_v1_public_users_path,
        params: { user: { first_name: "Test", last_name: "User", email: "test@example.com" } }

      expect(response).to have_http_status(:success)
      expect(response.parsed_body["user"]["email"]).to eq("test@example.com")
    end
  end
end
