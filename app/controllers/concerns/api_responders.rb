# frozen_string_literal: true

module ApiResponders
  extend ActiveSupport::Concern

  def respond_with_save(record, action)
    if record.save
      respond_with_success(t("successfully_#{action}", entity: record.class.name))
    else
      respond_with_error(record.errors.full_messages.to_sentence)
    end
  end

  def respond_with_error(message, status = :unprocessable_entity, context = {})
    render status: status, json: { error: message }.merge(context)
  end

  def respond_with_success(message, status = :ok, context = {})
    render status: status, json: { notice: message }.merge(context)
  end
end
