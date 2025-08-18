# frozen_string_literal: true

class Option < ApplicationRecord
  MAX_OPTION_LENGTH = 100

  belongs_to :question

  validates :content, presence: true, length: { maximum: MAX_OPTION_LENGTH }
end
