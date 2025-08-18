# frozen_string_literal: true

require "rails_helper"

describe User, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:quizzes) }
    it { is_expected.to have_many(:attempts) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_length_of(:first_name).is_at_most(50) }
    it { is_expected.to validate_presence_of(:last_name) }
    it { is_expected.to validate_length_of(:last_name).is_at_most(50) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to allow_value("user@example.com").for(:email) }
    it { is_expected.not_to allow_value("user@example,com").for(:email) }
    it { is_expected.to validate_presence_of(:role) }
    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to validate_length_of(:password).is_at_least(6) }
    it { is_expected.to validate_confirmation_of(:password) }
    it { is_expected.to validate_presence_of(:password_confirmation) }
  end

  describe "instance methods" do
    it "downcases email before save" do
      user = build(:user, email: "TEST@EXAMPLE.COM")
      user.save!
      expect(user.email).to eq "test@example.com"
    end

    it "does not save user without password" do
      user = build(:user, password: nil)
      expect(user.save).to be false
      expect(user.errors.full_messages).to include("Password can't be blank")
    end

    it "does not save user with short password" do
      user = build(:user, password: "a" * 5, password_confirmation: "a" * 5)
      expect(user.save).to be false
      expect(user.errors.full_messages).to include("Password is too short (minimum is 6 characters)")
    end

    it "does not save user without password confirmation" do
      user = build(:user, password_confirmation: nil)
      expect(user.save).to be false
      expect(user.errors.full_messages).to include("Password confirmation can't be blank")
    end

    it "does not save user if password and confirmation do not match" do
      user = build(:user, password_confirmation: "")
      expect(user.save).to be false
      expect(user.errors.full_messages).to include("Password confirmation doesn't match Password")
    end
  end
end
