# frozen_string_literal: true

class ReportChannel < ApplicationCable::Channel
  def subscribed
    stream_from "report_channel_#{current_user.id}"
  end
end
