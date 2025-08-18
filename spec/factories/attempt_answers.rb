# frozen_string_literal: true

FactoryBot.define do
  factory :attempt_answer do
    association :attempt
    association :question
  end
end
