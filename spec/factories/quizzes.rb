# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    title { Faker::Lorem.sentence(word_count: 3) }
    association :user
  end
end
