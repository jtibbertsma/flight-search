class FlightsController < ApplicationController
  def search
    render json: { formData: params }
  end
end
