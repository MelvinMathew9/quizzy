# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  def create
    @attempt = Attempt.find_by({ quiz_id: attempt_params[:quiz_id], user_id: attempt_params[:user_id] })
    unless @attempt.present?
      @attempt = Attempt.new(attempt_params)
      if !@attempt.save
        errors = @attempt.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
    render status: :ok, json: { attempt: @attempt }
  end

  private

    def attempt_params
      params.require(:attempt).permit(:quiz_id, :user_id)
    end
end
