# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    content { Faker::Lorem.word }
    is_answer { false }
    association :question
  end
end
