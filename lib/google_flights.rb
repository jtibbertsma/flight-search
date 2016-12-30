class GoogleFlights
  API_KEY = Rails.application.secrets.google_api_key
  URI = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=#{API_KEY}"

  class << self
    def search(data)
      body = { request: data }
      return Typhoeus::Request.new(URI,
        method: 'POST',
        body: body.to_json,
        headers: {'Content-Type'=>'application/json'}
      )
    end
  end
end
