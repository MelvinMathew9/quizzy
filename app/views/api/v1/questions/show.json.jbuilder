# frozen_string_literal: true

json.question do
  json.extract! @question,
    :question,
    :options
end
