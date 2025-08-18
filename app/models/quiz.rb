# frozen_string_literal: true

class Quiz < ApplicationRecord
  include SlugGenerator

  MAX_TITLE_LENGTH = 250

  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :attempts, dependent: :destroy

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }

  scope :recent, -> { order(created_at: :desc) }

  def set_slug!
    self.slug = Quiz.generate_unique_slug_for(title)
    save
  end

  def serialized_questions
    questions.map { |question| { id: question.id, question: question.question, options: question.options } }
  end
end
