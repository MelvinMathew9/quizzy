# frozen_string_literal: true

json.quiz do
  json.extract! @quiz,
    :id,
    :slug,
    :title

  json.questions @questions do |question|
     json.extract! question,
       :id,
       :question,
       :options
   end
end
