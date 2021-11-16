# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = Quiz.new(title: "test title", slug: "test-title", user: @user)
    @question = Question.new(question: "Question 1", quiz: @quiz)
    @option = Option.new(content: "Option1", is_answer: true, question: @question)
  end

  def test_content_should_not_be_blank
    @option.content = ""
    assert @option.invalid?
  end

  def test_option_should_not_be_valid_without_question
    @option.question = nil
    assert_not @option.save
    assert_equal ["Question must exist"], @option.errors.full_messages
  end

  def test_option_should_not_exceed_maximum_length
    @option.content = "a" * 101
    assert_not @option.valid?
    assert_equal ["Content is too long (maximum is 100 characters)"], @option.errors.full_messages
  end
end
