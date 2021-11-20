# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform(email)
    quiz_ids = User.find_by_email(email).quizzes.map { |quiz| quiz.id }
    attempts = Attempt.where(submitted: true, quiz_id: quiz_ids).joins(
      :user,
      :quiz).select("attempts.*, quizzes.title, users.email, users.first_name, users.last_name")

    attempts = attempts.map do |attempt|
      {
        title: attempt.title,
        name: attempt.first_name + " " + attempt.last_name,
        email: attempt.email,
        correct_answers_count: attempt.correct_answers_count,
        incorrect_answers_count: attempt.incorrect_answers_count
      }
    end

    reports = attempts.pluck :title, :name, :email, :correct_answers_count, :incorrect_answers_count
    total reports.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row %w(Quiz\ Name Name Email Correct Incorrect)
      reports.each.with_index(1) do |report, idx|
        worksheet.add_row report
        at idx
      end
    end
    sleep 10
    report_export_files = Dir[Rails.root.join("tmp", "report_export_*.xlsx")]
    report_export_files.each do |file|
      FileUtils.rm file
    end
    xlsx_package.serialize Rails.root.join("tmp", "report_export_#{self.jid}.xlsx")
  end
end
