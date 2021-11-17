# frozen_string_literal: true

json.reports @attempts do |attempt|
     json.extract! attempt,
       :correct_answers_count,
       :incorrect_answers_count,
       :title,
       :first_name,
       :last_name,
       :email
end
