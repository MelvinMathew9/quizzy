# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    submitted { false }
    correct_answers_count { 0 }
    incorrect_answers_count { 0 }
    association :user
    association :quiz
  end
end
