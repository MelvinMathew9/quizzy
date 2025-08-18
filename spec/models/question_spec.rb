# frozen_string_literal: true

require "rails_helper"

describe Question, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:quiz) }
    it { is_expected.to have_many(:options) }
    it { is_expected.to have_many(:attempt_answers) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:question) }
    it { is_expected.to validate_length_of(:question).is_at_most(Question::MAX_QUESTION_LENGTH) }
  end

  describe "custom validations" do
    it "is invalid if question exceeds max length" do
      question = build(:question, question: "a" * 251)
      expect(question).not_to be_valid
      expect(question.errors.full_messages).to include("Question is too long (maximum is 250 characters)")
    end

    it "is invalid if more than 4 options" do
      question = build(
        :question, options_attributes: [
        { content: "1", is_answer: true },
        { content: "2", is_answer: false },
        { content: "3", is_answer: false },
        { content: "4", is_answer: false },
        { content: "5", is_answer: false }
      ])
      expect(question.save).to be false
      expect(question.errors.full_messages).to include("Length should be between 2 and 4")
    end

    it "is invalid if options are not unique" do
      question = build(
        :question, options_attributes: [
        { content: "1", is_answer: true },
        { content: "1", is_answer: false }
      ])
      expect(question).not_to be_valid
      expect(question.errors.full_messages).to include("Options must be unique")
    end

    it "is invalid if more than one correct option" do
      question = build(
        :question, options_attributes: [
        { content: "1", is_answer: true },
        { content: "2", is_answer: true }
      ])
      expect(question).not_to be_valid
      expect(question.errors.full_messages).to include("Exactly one answer should be present in options")
    end
  end

  describe "#as_json" do
    it "returns json" do
      question = build(
        :question, options_attributes: [
        { content: "1", is_answer: true },
        { content: "2", is_answer: false }
      ])
      expect(question.as_json).to include(:id, :question, :options)
    end
  end
end
