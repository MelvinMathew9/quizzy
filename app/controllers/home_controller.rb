# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { render json: { status: "ok" } }
    end
  end
end
