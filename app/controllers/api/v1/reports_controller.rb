# frozen_string_literal: true

class Api::V1::ReportsController < ApplicationController
  include Authenticatable

  def index
    @attempts = ReportQuery.call(@current_user)
  end

  def export
    job_id = ExportReportWorker.perform_async(@current_user.email)
    render json: { id: job_id }
  end

  def export_status
    job_id = params[:id]
    job_status = Sidekiq::Status.get_all(job_id).symbolize_keys
    render json: { status: job_status[:status] }
  end

  def export_download
    job_id = params[:id]
    exported_file_name = "report_export_#{job_id}.xlsx"
    filename = "ReportData_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}.xlsx"
    respond_to do |format|
      format.xlsx do
        send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
      end
    end
  end
end
