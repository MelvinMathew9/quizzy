# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :handle_authorization_error
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  private

    def handle_authorization_error
      respond_with_error(t("authorization.denied"), :forbidden)
    end

    def handle_record_not_found(exception)
      respond_with_error(exception.message, :not_found)
    end
end
