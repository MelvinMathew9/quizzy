# frozen_string_literal: true

require "rails_helper"

describe Attempt, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:quiz) }
    it { is_expected.to have_many(:attempt_answers).dependent(:destroy) }
  end
end
