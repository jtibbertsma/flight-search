class FlightsController < ApplicationController
  def search
    hydra.queue(flight_request)
    hydra.run

    trips = trip_list(flight_request)
    render json: { flights: trips }
  end

  private
    def hydra
      Typhoeus::Hydra.hydra
    end

    def flight_request
      @request ||= GoogleFlights.search(params[:data])
    end

    def trip_list(request)
      MultiJson.load(request.response.body)['trips']['tripOption']
    end
end
