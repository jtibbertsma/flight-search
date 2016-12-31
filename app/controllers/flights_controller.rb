class FlightsController < ApplicationController
  before_action :set_origin
  before_action :set_date
  before_action :get_destinations

  def search
    request_list.each { |req| hydra.queue(req) }
    # sends request concurrently, but waits for all requests to be completed
    hydra.run

    trips = []
    request_list.each do |req|
      if req.response.code != 200
        render json: req.response.body, status: 422
        return
      end

      trips += trip_list(req) || []
    end

    trips.sort_by! { |trip| trip['saleTotal'][/\d+/].to_i }
    render json: { flights: trips.first(100) }
  end

  private
    def set_origin
      @data = params[:data]

      if !@data[:origin]
        @data[:origin] = Airport.nearest_airport(params[:coords])
      end
    end

    def set_date
      if !@data[:date]
        # Get date of tomorrow as a string
        @data[:date] = (Time.now + 1.day).to_s[/\d+-\d+-\d+/]
      end
    end

    def get_destinations
      @destinations = ['LAX', 'BOS']
    end

    def request_list
      @request_list ||= @destinations.map do |destination|
        @data[:destination] = destination
        GoogleFlights.search(@data)
      end
    end

    def hydra
      @hydra ||= Typhoeus::Hydra.new(max_concurrency: 12)
    end

    def trip_list(request)
      MultiJson.load(request.response.body)['trips']['tripOption']
    end
end
