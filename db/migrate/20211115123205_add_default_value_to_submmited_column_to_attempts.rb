# frozen_string_literal: true

class AddDefaultValueToSubmmitedColumnToAttempts < ActiveRecord::Migration[6.1]
  def change
    change_column_default :attempts, :submitted, false
  end
end
