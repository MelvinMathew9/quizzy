# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.new(title: "test", user: @user)
    @attempt = Attempt.new(quiz: @quiz, user: @user)
  end

  def test_attempt_should_be_valid
    @user.save
    @quiz.save
    assert @attempt.valid?
  end

  def test_attempt_should_not_be_valid_without_user
    @attempt.user = nil
    assert_not @attempt.save
    assert_equal ["User must exist"], @attempt.errors.full_messages
  end

  def test_attempt_should_not_be_valid_without_quiz
    @attempt.quiz = nil
    assert_not @attempt.save
    assert_equal ["Quiz must exist"], @attempt.errors.full_messages
  end

  def test_quiz_and_user_should_be_unique
    @user.save
    @quiz.save
    @attempt.save
    attempt_2 = Attempt.new(user: @user, quiz: @quiz)
    assert_not attempt_2.save
    assert_equal ["Quiz has already been taken"], attempt_2.errors.full_messages
  end
end
