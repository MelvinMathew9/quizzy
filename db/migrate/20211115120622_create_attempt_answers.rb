# frozen_string_literal: true

class CreateAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.integer :answer
      t.references :attempt, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true
      t.index [:attempt, :question], unique: true
      t.timestamps
    end
  end
end
