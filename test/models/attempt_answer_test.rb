# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = Quiz.new(title: "test title", slug: "test-title", user: @user)
    @question = Question.new(
      question: "Question 1", quiz: @quiz,
      options_attributes: [{ content: "1", is_answer: true }, { content: "2", is_answer: false }])
    @attempt = Attempt.new(quiz: @quiz, user: @user)
    @attempt_answer = AttemptAnswer.new(answer: "test", question: @question, attempt: @attempt)
  end

  def test_attempt_answer_should_be_valid
    @user.save
    @quiz.save
    @question.save
    @attempt.save
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_should_not_be_valid_without_attempt
    @attempt_answer.attempt = nil
    assert_not @attempt_answer.save
    assert_equal ["Attempt must exist"], @attempt_answer.errors.full_messages
  end

  def test_attempt_answer_should_not_be_valid_without_question
    @attempt_answer.question = nil
    assert_not @attempt_answer.save
    assert_equal ["Question must exist"], @attempt_answer.errors.full_messages
  end

  def test_question_and_attempt_should_be_unique
    @attempt.save
    @question.save
    @attempt_answer.save
    attempt_answer_2 = AttemptAnswer.new(attempt: @attempt, question: @question)
    assert_not attempt_answer_2.save
    assert_equal ["Attempt has already been taken"], attempt_answer_2.errors.full_messages
  end
end
