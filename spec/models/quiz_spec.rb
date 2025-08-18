# frozen_string_literal: true

require "rails_helper"

describe Quiz, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:questions) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_most(250) }
  end

  describe "scopes" do
    it "returns quizzes in descending order of creation" do
      older = create(:quiz, created_at: 2.days.ago)
      newer = create(:quiz, created_at: 1.day.ago)

      expect(Quiz.recent).to eq([newer, older])
    end
  end

  describe "#set_slug!" do
    it "returns a slug for the quiz" do
      quiz = create(:quiz, title: "My Quiz")
      quiz.set_slug!
      expect(quiz.slug).to eq "my-quiz"
    end

    it "generates incremental slug for duplicate two-worded titles" do
      user = create(:user)
      first_quiz = create(:quiz, title: "test quiz", user: user)
      first_quiz.set_slug!
      second_quiz = create(:quiz, title: "test quiz", user: user)
      second_quiz.set_slug!
      expect(first_quiz.slug).to eq "test-quiz"
      expect(second_quiz.slug).to eq "test-quiz-2"
    end

    it "generates incremental slug for duplicate hyphenated titles" do
      user = create(:user)
      first_quiz = create(:quiz, title: "test-quiz", user: user)
      first_quiz.set_slug!
      second_quiz = create(:quiz, title: "test-quiz", user: user)
      second_quiz.set_slug!
      expect(first_quiz.slug).to eq "test-quiz"
      expect(second_quiz.slug).to eq "test-quiz-2"
    end
  end

  describe "#serialized_questions" do
    it "returns array of hashes with id, question, and options for each question" do
      quiz = create(:quiz)

      question1 = create(
        :question, quiz: quiz, options_attributes: [
        { content: "1", is_answer: true },
        { content: "2", is_answer: false }
      ])
      question2 = create(
        :question, quiz: quiz, options_attributes: [
        { content: "3", is_answer: true },
        { content: "4", is_answer: false }
      ])
      result = quiz.serialized_questions
      expect(result).to all(include(:id, :question, :options))
      expect(result.size).to eq(2)
      expect(result.map { |q| q[:id] }).to match_array([question1.id, question2.id])
    end
  end
end
