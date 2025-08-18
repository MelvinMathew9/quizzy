# frozen_string_literal: true

class ReportChannel < ApplicationCable::Channel
  def subscribed
    job_id = params[:job_id]
    stream_for job_id if job_id.present?
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
