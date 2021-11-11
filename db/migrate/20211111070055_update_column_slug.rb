# frozen_string_literal: true

class UpdateColumnSlug < ActiveRecord::Migration[6.1]
  def change
    change_column_null :quizzes, :slug, true
  end
end
