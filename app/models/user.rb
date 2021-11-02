# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\. [a-z]+)*\.[a-z]+\z/i
  enum role: { standard: 0, administrator: 1 }
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  before_save :to_downcase

  private

    def to_downcase
      email.downcase!
    end
end
