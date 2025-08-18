# frozen_string_literal: true

class GenerateReportJob < ApplicationJob
  queue_as :reports

  def perform(email)
    user = User.find_by_email(email)
    attempts = ReportQuery.call(user)

    generate_xlsx(attempts, job_id)
    broadcast_data(job_id)
  end

  private

    def generate_xlsx(attempts, job_id)
      reports = generate_report_data(attempts)

      xlsx_package = Axlsx::Package.new
      xlsx_workbook = xlsx_package.workbook
      xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
        worksheet.add_row %w(Quiz\ Name Name Email Correct Incorrect)
        reports.each.with_index(1) do |report, idx|
          worksheet.add_row report
        end
      end
      cleanup_old_reports
      xlsx_package.serialize(Rails.root.join("tmp", "report_export_#{job_id}.xlsx"))
    end

    def generate_report_data(attempts)
      attempts.map do |attempt|
        [
          attempt.title,
          "#{attempt.first_name} #{attempt.last_name}",
          attempt.email,
          attempt.correct_answers_count,
          attempt.incorrect_answers_count
        ]
      end
    end

    def broadcast_data(job_id)
      sleep(5)
      ReportChannel.broadcast_to(job_id, { status: "complete", jobId: job_id })
    end

    def cleanup_old_reports
      Dir[Rails.root.join("tmp", "report_export_*.xlsx")].each do |file|
        FileUtils.rm file
      end
    end
end
