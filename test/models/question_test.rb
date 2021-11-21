# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = Quiz.new(title: "test title", slug: "test-title", user: @user)
    @question = Question.new(
      question: "Question 1", quiz: @quiz,
      options_attributes: [{ content: "1", is_answer: true }, { content: "2", is_answer: false }])
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

  def test_question_can_have_atmost_four_options
    @question.options_attributes = [{ content: "1", is_answer: true }, { content: "2", is_answer: false },
{ content: "3", is_answer: false }, { content: "4", is_answer: false }, { content: "5", is_answer: false }]
    assert_not @question.save
    assert_includes @question.errors.full_messages, "Options Length should be more than 2 and less than 4"
  end

  def test_question_should_have_unique_options
    @question.options_attributes = [{ content: "1", is_answer: true }, { content: "1", is_answer: false }]
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Options Options must be unique"
  end

  def test_question_should_have_only_one_correct_option
    @question.options_attributes = [{ content: "1", is_answer: true }, { content: "2", is_answer: true }]
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Options Exactly one answer should be present in options"
  end
end
