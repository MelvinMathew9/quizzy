# frozen_string_literal: true

require "test_helper"

class QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome",
      role: "administrator"
    )
    @quiz = Quiz.create(
      title: "test",
      user: @user
    )
    @question = Question.create(
      question: "test",
      quiz: @quiz,
      options_attributes: [{ content: "1", is_answer: true }, { content: "2", is_answer: false }])
  end

  def test_should_create_valid_question
    post questions_url, params: {
      questions: {
        question: @question.question,
        quiz_id: @quiz.id,
        options_attributes: [{ content: "2", is_answer: true },
{ content: "3", is_answer: false }]
      }
    }, headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Question")
  end

  def test_creator_can_show_quiz
    get "/quetions/#{@quiz.id}",
      headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
  end

  def test_creator_can_update_any_quiz_fields
    new_title = "#{@quiz.title}test"
    question_params = {
      questions: {
        question: new_title,
        quiz_id: @quiz.id,
        options_attributes: [{ content: "3", is_answer: false }, { content: "4", is_answer: false }]
      }
    }
    put "/questions/#{@question.id}", params: question_params,
headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    @question.reload
    assert_equal @question.question, new_title
  end

  def test_creator_should_be_able_to_destroy_quiz
    initial_question_count = Question.all.size
    delete "/questions/#{@question.id}",
      headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    assert_equal Question.all.size, initial_question_count - 1
  end
end
