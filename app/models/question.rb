# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_QUESTION_LENGTH = 250
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  validates :question, presence: true, length: { maximum: MAX_QUESTION_LENGTH }
  validate :check_options_length
  validate :uniqueness_of_options
  validate :exactly_one_answer_should_present_in_options

  private

    def check_options_length
      unless options.length >= 2 && options.length <= 4
        errors.add(:options, "Length should be more than 2 and less than 4")
      end
    end

    def uniqueness_of_options
      errors.add(:options, "Options must be unique") if options.map(&:content).uniq.size != options.size
    end

    def exactly_one_answer_should_present_in_options
      errors.add(:options, "Exactly one answer should be present in options") if options.filter { |option|
 option.is_answer}.size != 1
    end
end
