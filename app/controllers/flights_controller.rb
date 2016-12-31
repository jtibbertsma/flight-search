class FlightsController < ApplicationController
  before_action :enforce_facebook_login

  before_action :set_origin
  before_action :set_date
  before_action :set_destinations

  def search
    trips = []
    request_list.each do |req|
      hydra.queue(req)
      req.on_complete do |res|
        if res.success?
          trips += trip_list(res)
        else
          hydra.abort
          render json: res.body, status: 400
          return
        end
      end
    end

    hydra.run

    trips.sort_by! { |trip| trip['saleTotal'][/\d+/].to_i }
    render json: { flights: trips.first(100) }
  end

  private
    def enforce_facebook_login
      res = Typhoeus.get("https://graph.facebook.com/v2.8/me?access_token=#{params[:token]}")

      unless res.success?
        render json: { error: "Invalid facebook token" }, status: 403
      end
    end

    ## API defaults
    # Default origin is nearest airport
    # Default possible destinations are the 8 furthest airports
    # Default date is a week from now

    def set_origin
      @data = params[:data]

      if !@data[:origin].present?
        @data[:origin] = Airport.nearest(params[:coords]).first
      end
    end

    def set_date
      if !@data[:date].present?
        @data[:date] = (Time.now + 1.week).to_s[/\d+-\d+-\d+/]
      end
    end

    def set_destinations
      if !@data[:destinations].present?
        nearest = Airport.find_by_code(@data[:origin])
        coord = [nearest.latitude.to_f, nearest.longitude.to_f]
        @destinations = Airport.furthest(coord).first(8)
      else
        @destinations = @data.delete(:destinations)
      end
    end

    def request_list
      @request_list ||= @destinations.map do |destination|
        @data[:destination] = destination
        GoogleFlights.search(@data)
      end
    end

    def hydra
      @hydra ||= Typhoeus::Hydra.new(max_concurrency: 8)
    end

    def trip_list(response)
      MultiJson.load(response.body)['trips']['tripOption'] || []
    end
end
