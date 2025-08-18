# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    question { Faker::Lorem.sentence(word_count: 5) }
    association :quiz
    options_attributes {
      [
        { content: "Option 1", is_answer: true },
        { content: "Option 2", is_answer: false }
      ]
    }
  end
end
