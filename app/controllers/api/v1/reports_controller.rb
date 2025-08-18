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
    render json: { status: job_status }
  end

  def export_download
    respond_to do |format|
      format.xlsx do
        send_file exported_file_path, type: :xlsx, filename: download_filename
      end
    end
  end

  private

    def job_id
      params[:id]
    end

    def job_status
      Sidekiq::Status.get_all(job_id).symbolize_keys[:status]
    end

    def exported_file_path
      Rails.root.join("tmp", "report_export_#{job_id}.xlsx")
    end

    def download_filename
      "ReportData_#{DateTime.now.strftime('%Y%m%d_%H%M%S')}.xlsx"
    end
end
