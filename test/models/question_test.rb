# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = Quiz.new(title: "test title", slug: "test-title", user: @user)
    @question = Question.new(question: "Question 1", quiz: @quiz)
  end

  def test_question_should_not_be_blank
    @question.question = ""
    assert @question.invalid?
  end

  def test_question_should_not_be_valid_without_quiz
    @question.quiz = nil
    assert_not @question.save
    assert_equal ["Quiz must exist"], @question.errors.full_messages
  end

  def test_question_should_not_exceed_maximum_length
    @question.question = "a" * 251
    assert_not @question.valid?
    assert_equal ["Question is too long (maximum is 250 characters)"], @question.errors.full_messages
  end
end
