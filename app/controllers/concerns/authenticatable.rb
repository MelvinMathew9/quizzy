# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_using_x_auth_token
  end

  def authenticate_user_using_x_auth_token
    user = find_user_from_headers
    token = fetch_auth_token

    if valid_user_and_token?(user, token)
      @current_user = user
    else
      render_unauthorized
    end
  end

  private

    def find_user_from_headers
      user_email = request.headers["X-Auth-Email"]
      user_email && User.find_by_email(user_email)
    end

    def fetch_auth_token
      request.headers["X-Auth-Token"].presence
    end

    def valid_user_and_token?(user, token)
      user && token && ActiveSupport::SecurityUtils.secure_compare(user.authentication_token, token)
    end

    def render_unauthorized
      render status: :unauthorized, json: { error: [t("session.could_not_auth")] }
    end

    def current_user
      @current_user
    end
end
