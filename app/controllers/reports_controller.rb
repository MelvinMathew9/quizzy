# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  def index
    quiz_ids = @current_user.quizzes.map { |quiz| quiz.id }
    @attempts = Attempt.where(submitted: true, quiz_id: quiz_ids).joins(
      :user,
      :quiz).select("attempts.*, quizzes.title, users.first_name, users.last_name, users.email")
  end

  def export
    job_id = ExportReportWorker.perform_async(@current_user.email)
    render json: { jid: job_id }
  end

  def export_status
    job_id = params[:id]
    job_status = Sidekiq::Status.get_all(job_id).symbolize_keys
    render json: { status: job_status[:status] }
  end

  def export_download
    job_id = params[:id]
    exported_file_name = "report_export_#{job_id}.xlsx"
    filename = "ReportData_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}"
    respond_to do |format|
      format.xlsx do
        send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
      end
    end
  end
end
