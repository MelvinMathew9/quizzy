# frozen_string_literal: true

class AddUniquenessToIndexesToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_index :attempts, [:quiz, :user], unique: true
  end
end
