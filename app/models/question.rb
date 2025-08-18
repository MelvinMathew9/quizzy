# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_QUESTION_LENGTH = 250
  MIN_OPTIONS_COUNT = 2
  MAX_OPTIONS_COUNT = 4

  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy

  accepts_nested_attributes_for :options, allow_destroy: true

  validates :question, presence: true, length: { maximum: MAX_QUESTION_LENGTH }
  validate :check_options_length
  validate :uniqueness_of_options
  validate :exactly_one_answer_should_present_in_options

  def as_json
    {
      id: id,
      question: question,
      options: options.map { |option| { id: option.id, content: option.content } }
    }
  end

  private

    def check_options_length
      unless options.length >= MIN_OPTIONS_COUNT && options.length <= MAX_OPTIONS_COUNT
        errors.add(:base, "Length should be between #{MIN_OPTIONS_COUNT} and #{MAX_OPTIONS_COUNT}")
      end
    end

    def uniqueness_of_options
      if filtered_options.map(&:content).uniq.size != filtered_options.size
        errors.add(:base, "Options must be unique")
      end
    end

    def exactly_one_answer_should_present_in_options
      unless options.filter { |option| option.is_answer }.one?
        errors.add(:base, "Exactly one answer should be present in options")
      end
    end

    def filtered_options
      options.reject(&:marked_for_destruction?)
    end
end
