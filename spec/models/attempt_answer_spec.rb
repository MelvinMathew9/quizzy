# frozen_string_literal: true

require "rails_helper"

describe AttemptAnswer, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:attempt) }
    it { is_expected.to belong_to(:question) }
  end
end
