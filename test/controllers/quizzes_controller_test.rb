# frozen_string_literal: true

require "test_helper"

class QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.new(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome",
      role: "administrator"
    )
    @quiz = Quiz.new(
      title: "test",
      user: @user
    )
  end

  def test_should_list_all_quizzes_for_valid_user
    @user.save
    get quizzes_url, headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["quizzes"].length, Quiz.count
  end

  def test_should_create_valid_quiz
    @user.save
    post quizzes_url, params: { quiz: { title: "test", user_id: @user.id } },
headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Quiz")
  end

  def test_creator_can_view_quiz
    @user.save
    @quiz.save
    get "/quizzes/#{@quiz.id}", headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    end

  def test_creator_can_update_title
    @user.save
    @quiz.save
    new_title = "#{@quiz.title}test"
    quiz_params = { quiz: { title: new_title } }
    put "/quizzes/#{@quiz.id}", params: quiz_params,
headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    @quiz.reload
    assert_equal @quiz.title, new_title
  end

  def test_creator_should_be_able_to_destroy_quiz
    @user.save
    @quiz.save
    initial_quiz_count = Quiz.all.size
    delete "/quizzes/#{@quiz.id}",
      headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    assert_equal Quiz.all.size, initial_quiz_count - 1
  end
end
