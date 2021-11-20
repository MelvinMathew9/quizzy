# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_QUESTION_LENGTH = 250
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy

  validates :question, presence: true, length: { maximum: MAX_QUESTION_LENGTH }
end
