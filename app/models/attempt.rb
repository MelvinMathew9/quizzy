# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  validates :quiz, uniqueness: { scope: :user }
end
