# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\. [a-z]+)*\.[a-z]+\z/i
  has_many :quizzes
  enum role: { standard: 0, administrator: 1 }
  has_secure_password
  has_secure_token :authentication_token

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true, on: :create
  validates :role, presence: true

  before_save :to_downcase

  private

    def to_downcase
      email.downcase!
    end
end
