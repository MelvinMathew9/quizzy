# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\. [a-z]+)*\.[a-z]+\z/i
  MAX_NAME_LENGTH = 50
  MIN_PASSWORD_LENGTH = 6
  has_many :quizzes
  has_many :attempts, dependent: :destroy
  enum role: { standard: 0, administrator: 1 }
  has_secure_password
  has_secure_token :authentication_token

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :password, presence: true, confirmation: true, length: { minimum: MIN_PASSWORD_LENGTH }
  validates :password_confirmation, presence: true, on: :create
  validates :role, presence: true

  before_save :to_downcase

  private

    def to_downcase
      email.downcase!
    end
end
