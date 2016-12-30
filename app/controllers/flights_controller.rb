class FlightsController < ApplicationController
  def search
    hydra.queue(flight_request)
    hydra.run

    Rails.logger.info flight_request.response.body

    render json: { flights: flight_request.response.body }
  end

  private
    def hydra
      Typhoeus::Hydra.hydra
    end

    def flight_request
      @request ||= GoogleFlights.search(params[:data])
    end
end
