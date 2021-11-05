# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.new(title: "test title", slug: "test-title", user: @user)
  end

  def test_quiz_should_not_be_valid_without_user
    @quiz.user = nil
    assert_not @quiz.save
    assert_equal ["User must exist"], @quiz.errors.full_messages
  end

  def test_quiz_title_should_not_exceed_maximum_length
    @quiz.title = "a" * 251
    assert_not @quiz.valid?
  end

  def test_quiz_should_not_be_valid_without_title
    @quiz.title = ""
    assert @quiz.invalid?
  end

  def test_quiz_slug_is_parameterized_title
    title = @quiz.title
    @quiz.save!
    assert_equal title.parameterize, @quiz.slug
  end

  def test_incremental_slug_generation_for_quizzes_with_duplicate_two_worded_titles
    first_quiz = Quiz.create!(title: "test quiz", user: @user)
    second_quiz = Quiz.create!(title: "test quiz", user: @user)

    assert_equal "test-quiz", first_quiz.slug
    assert_equal "test-quiz-2", second_quiz.slug
  end

  def test_incremental_slug_generation_for_quizzes_with_duplicate_hyphenated_titles
    first_quiz = Quiz.create!(title: "test-quiz", user: @user)
    second_quiz = Quiz.create!(title: "test-quiz", user: @user)

    assert_equal "test-quiz", first_quiz.slug
    assert_equal "test-quiz-2", second_quiz.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_quiz = Quiz.create!(title: "another test quiz", user: @user)

    assert_raises ActiveRecord::RecordInvalid do
      another_test_quiz.update!(slug: @quiz.slug)
    end

    error_msg = another_test_quiz.errors.full_messages.to_sentence
    assert_match t("quiz.slug.immutable"), error_msg
  end
end
