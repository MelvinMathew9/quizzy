# frozen_string_literal: true

class Api::V1::ReportsController < ApplicationController
  include Authenticatable

  def index
    @attempts = ReportQuery.call(@current_user)
  end

  def export
    job = GenerateReportJob.perform_later(@current_user.email)

    render status: :ok, json: { id: job&.job_id }
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

    def exported_file_path
      Rails.root.join("tmp", "report_export_#{job_id}.xlsx")
    end

    def download_filename
      "ReportData_#{DateTime.now.strftime('%Y%m%d_%H%M%S')}.xlsx"
    end
end
