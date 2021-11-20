# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def show?
    quiz.user_id == user.id && user.role == "administrator"
  end

  def update?
    show?
  end

  def create?
    user.role == "administrator"
  end

  def destroy?
    show?
  end
end
