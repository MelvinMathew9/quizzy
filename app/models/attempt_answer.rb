# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question

  validates :attempt, uniqueness: { scope: :question }
end
