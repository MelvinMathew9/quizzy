# frozen_string_literal: true

class ReportQuery
  include Mixins::Callable

  def call(user)
    @user = user

    attempts_for_user
  end

  private

    def attempts_for_user
      Attempt.where(submitted: true, quiz_id: quiz_ids)
        .joins(:user, :quiz)
        .select("attempts.*, quizzes.title, users.first_name, users.last_name, users.email")
    end

    def quiz_ids
      @user.quizzes.pluck(:id)
    end
end
