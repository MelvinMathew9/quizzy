# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  has_many :attempt_answers, dependent: :destroy

  validates :quiz_id, uniqueness: { scope: :user_id }
end
